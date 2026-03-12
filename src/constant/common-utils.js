export const setDataIntoLocalStorage = (key, data) => {
    const stringifyData = typeof data === "string" ? data : JSON.stringify(data);
    localStorage.setItem(key, stringifyData);
}
export const getDataFromLocalStorage = (key) => {
    const getData = localStorage.getItem(key);
    if (getData && getData !== null && getData !== undefined) {
        return typeof getData === "string" ? getData : JSON.parse(getData);
    } return null;
}

export const clearLocalStorage = () => {
    localStorage.clear();
}