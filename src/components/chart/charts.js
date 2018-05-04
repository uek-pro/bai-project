const createDoughnutChart = (element, pass, fail, belowOptimal = null) => {

    const values = belowOptimal == null ? [pass, fail] : [pass, belowOptimal, fail];
    const colors = belowOptimal == null ? ['green', 'red'] : ['green', 'orange', 'red'];
    const labels = belowOptimal == null ? ['Wykonano', 'Niewykonano'] : ['Wykonano', 'Częściwo wykonano', 'Niewykonano'];


    const data = {
        datasets: [
            {
                data: values,
                backgroundColor: colors
            }
        ],
        labels: labels
    };
    
    return new Chart(element, {
        type: 'doughnut',
        data: data,
        options: {
            aspectRatio: 1, // square shape
            legend: false//,
            //events: null
        }
    });
}

const createLineChart = (element, optimal, days, values) => {

    const data = {
        labels: days,
        datasets: [{
            fill: 'start',
            backgroundColor: 'green',
            data: values
        }]
    };

    return new Chart(element, {
        type: 'line',
        data: data,
        options: {
            legend: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0
                }
            },
            annotation: {
                annotations: [{
                    type: 'line',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: optimal,
                    borderColor: 'black',
                    borderWidth: 3
                }]
            }
        }
    });
}

export { createDoughnutChart, createLineChart };