export interface Training {
    id: number;
    date: string;
    distance: number;
}

export interface TrainingFormProps {
    formData: {
        date: string;
        distance: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            date: string;
            distance: string;
        }>
    >;
    editingId: number | null;
    onSubmit: (e: React.FormEvent) => void;
}
