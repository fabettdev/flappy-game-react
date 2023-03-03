export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

export function setLocalStorage(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
}