export const formatDateForInput = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};

export const parseDate = (dateString: string): number => {
    const [day, month, year] = dateString.split(".");
    return new Date(`${year}-${month}-${day}`).getTime();
};
