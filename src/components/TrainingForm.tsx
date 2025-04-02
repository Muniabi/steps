import React from "react";
import { TrainingFormProps } from "../types";

const TrainingForm: React.FC<TrainingFormProps> = ({
    formData,
    setFormData,
    editingId,
    onSubmit,
}) => (
    <form onSubmit={onSubmit} className="form">
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
                type="number"
                step="0.1"
                min="0.1"
                value={formData.distance}
                onChange={(e) =>
                    setFormData({ ...formData, distance: e.target.value })
                }
                required
            />
        </div>
        <button type="submit">{editingId ? "Обновить" : "Добавить"}</button>
    </form>
);

export default TrainingForm;
