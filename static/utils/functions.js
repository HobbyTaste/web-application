//функция поиска элемента в массиве
export const isInArray = (idHobby, array) => {
    if (array.includes(idHobby)) {
        return true;
    } else {
        return false;
    }
};
