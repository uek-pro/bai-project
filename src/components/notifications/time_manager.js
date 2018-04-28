const unixDateWithoutTime = () => {
    
    if (arguments.length == 1 && arguments[0] instanceof Date) {
        arguments[0].setHours(0, 0, 0, 0);
        return +date;
    } else {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return +now;
    }
}

export { unixDateWithoutTime };