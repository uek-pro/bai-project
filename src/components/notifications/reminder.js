const isCordova = !!window.cordova;

const reminder = !isCordova ? null : {
    schedule: (hour, minute) => {

        cordova.plugins.notification.local.schedule({
            id: 1,
            title: 'Przypomnienie',
            text: 'Kliknij, aby przeprowadzić realizację zadań.',
            trigger: { every: { hour: hour, minute: minute } }
        });
    },
    cancel: () => {
        cordova.plugins.notification.local.cancel(1);
    },
    afterClick: (cb) => {
        cordova.plugins.notification.local.on('click', cb, this);
    },
    afterTrigger: (cb) => {
        cordova.plugins.notification.local.on('trigger', cb, this);
    }
    // https://github.com/katzer/cordova-plugin-local-notifications#events
};

export default reminder;