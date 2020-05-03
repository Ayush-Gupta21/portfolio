import {API} from "../../backend"

export const getAbout = (aboutId) => {
    return fetch(`${API}/about/${aboutId}`, {
        method: "GET",
        Aheaders: {
            Accept: "application/json"
        }
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

export const updateAbout = (aboutId, userId, token, about) => {
    console.log("Thissss", about)
    return fetch(`${API}/about/${aboutId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(about)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}