const unixDateWithoutTime = (date = null) => {

    const dateWithoutTime = date != null ? new Date(+date) : new Date();
    dateWithoutTime.setHours(0, 0, 0, 0);
    return +dateWithoutTime;
}

const getRelativeDaysBetween = (earlierUnixDate, laterUnixDate) => {

    const diff = laterUnixDate - earlierUnixDate;
    return Math.ceil(diff / 864e5);
}

const formatDate = (unixDate) => {
    
    const date = new Date(unixDate);

    const monthNames = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

export { unixDateWithoutTime, getRelativeDaysBetween, formatDate };