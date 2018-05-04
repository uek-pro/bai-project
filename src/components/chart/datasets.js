const getDatasetForDoughnutChartsType0 = (assocDays, daysCount) => {

    const daysCount2Weeks = daysCount > 14 ? 14 : daysCount;
    const limit = daysCount - daysCount2Weeks;

    let successDays = 0, successDays2Weeks = 0;
    for (let k in assocDays) {
        if (assocDays.hasOwnProperty(k)) {
            ++successDays;
            if (+k >= limit) ++successDays2Weeks;
        }
    };

    return {
        allAlong: {
            success: successDays,
            failed: daysCount - successDays
        },
        last2Weeks: {
            success: successDays2Weeks,
            failed: daysCount2Weeks - successDays2Weeks
        }
    };
};

const getDatasetForDoughnutChartsType1 = (assocDays, daysCount, optimalValue) => {

    const daysCount2Weeks = daysCount > 14 ? 14 : daysCount;
    const limit = daysCount - daysCount2Weeks;

    let aboveOrEqualOptimalDays = 0, aboveOrEqualOptimalDays2Weeks = 0,
        belowOptimalDays = 0, belowOptimalDays2Weeks = 0;

    for (let k in assocDays) {
        if (assocDays.hasOwnProperty(k)) {
            if (assocDays[k] >= optimalValue) {
                ++aboveOrEqualOptimalDays;
            } else {
                ++belowOptimalDays;
            }
            if (+k >= limit) {
                if (assocDays[k] >= optimalValue) {
                    ++aboveOrEqualOptimalDays2Weeks;
                } else {
                    ++belowOptimalDays2Weeks;
                }
            }
        }
    };

    return {
        allAlong: {
            aboveOrEqualOptimal: aboveOrEqualOptimalDays,
            belowOptimal: belowOptimalDays,
            failed: daysCount - (aboveOrEqualOptimalDays + belowOptimalDays)
        },
        last2Weeks: {
            aboveOrEqualOptimal: aboveOrEqualOptimalDays2Weeks,
            belowOptimal: belowOptimalDays2Weeks,
            failed: daysCount2Weeks - (aboveOrEqualOptimalDays2Weeks + belowOptimalDays2Weeks)
        }
    };
};

const getDatasetForLineChart = (assocDays, daysCount) => {

    let daysArray = [];
    let valuesArray = [];

    let daysCounter = 0;
    for (let k in assocDays) {
        if (assocDays.hasOwnProperty(k)) {
            const c = +k;
            if (c > daysCounter) {
                for (let i = daysCounter; i < c; i++) {
                    daysArray.push(i);
                    valuesArray.push(0);
                    daysCounter++;
                }
            }
            daysArray.push(daysCounter);
            valuesArray.push(assocDays[k]);
            daysCounter++;
        };
    };

    if (daysCounter <= daysCount) {
        for (let i = daysCounter; i <= daysCount; i++) {
            daysArray.push(i);
            valuesArray.push(0);
        }
    }

    return [daysArray, valuesArray];
};

export {
    getDatasetForDoughnutChartsType0,
    getDatasetForDoughnutChartsType1,
    getDatasetForLineChart
};