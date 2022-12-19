export const setDataToLocalStorage = <T>(key: string, value: T) => {
    const valueToJSON = JSON.stringify(value)
    localStorage.setItem(key, valueToJSON)
}

export const getDataFromLocalStorage = <T>(key: string) => {
    return JSON.parse(localStorage.getItem(key)!) as T
}