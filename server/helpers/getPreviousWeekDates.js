const getPreviousWeekDates = () => {
    const today = new Date();
    const startOfPreviousWeek = new Date(today.setDate(today.getDate() - today.getDay() - 7));
    startOfPreviousWeek.setHours(0, 0, 0, 0);
    const endOfPreviousWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    endOfPreviousWeek.setHours(23, 59, 59, 999);
    return { startOfPreviousWeek, endOfPreviousWeek };
};

module.exports = getPreviousWeekDates;