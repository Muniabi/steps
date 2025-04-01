import React, { useState, useEffect } from "react";
import "./App.css";

interface Training {
    id: number;
    date: string;
    distance: number;
}

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

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split("-");
        return `${day}.${month}.${year}`;
    };

    const parseDate = (dateString: string): number => {
        const [day, month, year] = dateString.split(".");
        return new Date(`${year}-${month}-${day}`).getTime();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { date, distance } = formData;
        const distanceNum = parseFloat(distance);
        const formattedDate = formatDate(date);

        if (!formattedDate.match(/^\d{2}\.\d{2}\.\d{4}$/) || isNaN(distanceNum))
            return;

        setTrainings((prev) => {
            const existingIndex = prev.findIndex(
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

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].distance += distanceNum;
                return updated;
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
        const [day, month, year] = training.date.split(".");
        setFormData({
            date: `${year}-${month}-${day}`,
            distance: training.distance.toString(),
        });
        setEditingId(training.id);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <label>Дата (ДД.ММ.ГГГГ)</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Пройдено км</label>
                    <input
                        type="float"
                        step="0.1"
                        value={formData.distance}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                distance: e.target.value,
                            })
                        }
                        required
                        min="0"
                    />
                </div>
                <button type="submit">
                    {editingId ? "Обновить" : "Добавить"}
                </button>
            </form>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Пройдено км</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainings.map((training) => (
                            <tr key={training.id}>
                                <td>{training.date}</td>
                                <td>{training.distance.toFixed(1)}</td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(training)}
                                    >
                                        ✎
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(training.id)
                                        }
                                    >
                                        ✖
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
