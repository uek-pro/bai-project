const createDoughnutChart = (element, pass, fail, belowOptimal = null) => {

    const values = belowOptimal == null ? [pass, fail] : [pass, belowOptimal, fail];
    const colors = belowOptimal == null ? ['green', 'red'] : ['green', 'orange', 'red'];

    const data = {
        datasets: [
            {
                data: values,
                backgroundColor: colors
            }
        ]
    };

    const options = {
        title: {
            display: true,
            fontSize: 16,
            text: '% skuteczności'
        },
        legend: false,
        events: null
    };
    
    return new Chart(element, {
        type: 'doughnut',
        data: data,
        options: options
    });
}

export { createDoughnutChart };