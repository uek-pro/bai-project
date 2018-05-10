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

const getStreakValue = (days, relativeDaysCount) => {

    let streak = 0;
    if (days != null) {

        let pointer = relativeDaysCount;
        const keys = Object.keys(days);

        for (let i = keys.length - 1; i >= 0; i--) {
            
            if (+keys[i] == pointer) {
                pointer--;
                streak++;
            } else break; 
        }
    }
    return streak;
}

export { unixDateWithoutTime, getRelativeDaysBetween, formatDate, getStreakValue };