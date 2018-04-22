import firebase from 'firebase';

const addHabit = (habit) => {

    habit.date = +new Date();
    console.log(habit);

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices`).push().set(habit);
};

const deleteHabit = (key) => {

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices/${key}`).remove();
};

export { addHabit, deleteHabit };