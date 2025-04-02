import React, { useState, useEffect } from "react";
import "./App.css";
import { Training } from "./types";
import { formatDateForInput, parseDate } from "./utils/dateUtils";
import TrainingForm from "./components/TrainingForm";
import TrainingTable from "./components/TrainingTable";

function App() {
    const [trainings, setTrainings] = useState<Training[]>(() => {
        const saved = localStorage.getItem("trainings");
        return saved ? JSON.parse(saved) : [];
    });
    const [formData, setFormData] = useState({
        date: "",
        distance: "",
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        localStorage.setItem("trainings", JSON.stringify(trainings));
    }, [trainings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { date, distance } = formData;
        const distanceNum = parseFloat(distance);
        const formattedDate = formatDateForInput(date);

        if (!date || isNaN(distanceNum) || distanceNum <= 0) return;

        setTrainings((prev) => {
            const existingTraining = prev.find(
                (t) => t.date === formattedDate && t.id !== editingId
            );

            if (editingId !== null) {
                return prev
                    .map((t) =>
                        t.id === editingId
                            ? {
                                  ...t,
                                  date: formattedDate,
                                  distance: distanceNum,
                              }
                            : t
                    )
                    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
            }

            if (existingTraining) {
                return prev
                    .map((t) =>
                        t.date === formattedDate
                            ? { ...t, distance: t.distance + distanceNum }
                            : t
                    )
                    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
            }

            return [
                ...prev,
                {
                    id: Date.now(),
                    date: formattedDate,
                    distance: distanceNum,
                },
            ].sort((a, b) => parseDate(b.date) - parseDate(a.date));
        });

        setFormData({ date: "", distance: "" });
        setEditingId(null);
    };

    const handleDelete = (id: number) => {
        setTrainings((prev) => prev.filter((t) => t.id !== id));
    };

    const handleEdit = (training: Training) => {
        setFormData({
            date: training.date,
            distance: training.distance.toString(),
        });
        setEditingId(training.id);
    };

    return (
        <div className="App">
            <TrainingForm
                formData={formData}
                setFormData={setFormData}
                editingId={editingId}
                onSubmit={handleSubmit}
            />
            <TrainingTable
                trainings={trainings}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;
