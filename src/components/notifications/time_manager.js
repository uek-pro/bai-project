const unixDateWithoutTime = (date = null) => {

    const dateWithoutTime = date != null ? new Date(+date) : new Date();
    dateWithoutTime.setHours(0, 0, 0, 0);
    return +dateWithoutTime;
}

const getRelativeDaysBetween = (earlierUnixDate, laterUnixDate) => {

    const diff = laterUnixDate - earlierUnixDate;
    return Math.ceil(diff / 86400000);
}

export { unixDateWithoutTime, getRelativeDaysBetween };