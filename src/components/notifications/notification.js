const isDEV = false;
const isCordova = !!window.cordova;

const notifyDevelopement = (message) => console.log(message);
const notifyCordova = (message) => navigator.notification.alert(message);
const notifyOther = (message) => alert(message);

const notify = isDEV ? notifyDevelopement : (isCordova ? notifyCordova : notifyOther);

export default notify;