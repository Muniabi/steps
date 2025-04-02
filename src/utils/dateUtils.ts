export const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};

export const formatDateForEdit = (dateString: string): string => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
};

export const parseDate = (dateString: string): number => {
    const [day, month, year] = dateString.split(".");
    return new Date(`${year}-${month}-${day}`).getTime();
};
