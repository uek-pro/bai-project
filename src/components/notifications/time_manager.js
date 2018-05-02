const unixDateWithoutTime = (date = null) => {

    const dateWithoutTime = date != null ? new Date(+date) : new Date();
    dateWithoutTime.setHours(0, 0, 0, 0);
    return +dateWithoutTime;
}

export { unixDateWithoutTime };