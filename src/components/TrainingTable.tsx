import React from "react";
import { Training } from "../types";

interface TrainingTableProps {
    trainings: Training[];
    onEdit: (training: Training) => void;
    onDelete: (id: number) => void;
}

const TrainingTable: React.FC<TrainingTableProps> = ({
    trainings,
    onEdit,
    onDelete,
}) => (
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
                                onClick={() => onEdit(training)}
                            >
                                ✎
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => onDelete(training.id)}
                            >
                                ✖
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TrainingTable;
