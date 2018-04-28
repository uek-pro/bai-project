import firebase from 'firebase';
import { unixDateWoutTime } from '../../notifications/time_manager';


const addHabit = (habit) => {

    habit.date = unixDateWithoutTime();
    console.log(habit);

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices`).push().set(habit);
};

const deleteHabit = (key) => {

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices/${key}`).remove();
};

export { addHabit, deleteHabit };