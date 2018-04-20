import firebase from 'firebase';

const showHabits = () => {

    // pobierz zwyczaje

    return true;
}

const addHabit = (habit) => {

    habit.date = +new Date();
    console.log(habit);

    // pobierz listę
    // dodaj do listy obiekt habit
    // zapis listę

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}/practices`).push().set(habit);

    return true;
};

const editHabit = () => {

    // wyszukaj habit
    // usun habit
    // dodaj habit

    return true;
};

const deleteHabit = () => {

    // wyszukaj pasujący habit (wszystkie pola powinny być takie same)
    // array.splice(index, 1)

    return true;
};

export { showHabits, addHabit, editHabit, deleteHabit };