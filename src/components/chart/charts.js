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
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
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

const createRadarChart = (element, habitsTitles, values) => {

    return new Chart(element, {
        type: 'radar',
        data: {
            labels: habitsTitles,
            datasets: [{
                label: '% skuteczności',
                pointBackgroundColor: "rgba(140,200,60,1)",
                backgroundColor: "rgba(140,200,60,0.33)",
                borderColor: "rgba(140,200,60,0.67)",
                data: values,
            }],
        },
        options: {
            events: false,
            scale: {
                ticks: {
                    min: 0,
                    stepSize: 25,
                    max: 100,
                    callback: function (value) {
                        return value + "%"
                    }
                },
                pointLabels: {
                    fontSize: 16
                }
            },
            legend: {
                position: 'bottom'
            },
            title: {
                display: true,
                position: 'bottom',
                fontSize: 16,
                text: 'Skuteczność realizacji zadań w ostatnich 2 tygodniach'
            }
        }
    });
}

export { createDoughnutChart, createLineChart, createRadarChart };