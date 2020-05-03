import {API} from "../../backend"

export const createContact = (contact) => {
    console.log(contact)
    return fetch(`${API}/createcontact`, {
        method: "POST",
        headers:{
        Accept: "application/json",
        "content-Type":"application/json"
    },
    body: JSON.stringify(contact)
  })
  .then(response => {
      return response.json()
  })
  .catch(err => console.log)
}

export const getContacts = (userId, token) => {
    return fetch(`${API}/contacts/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getContact = (contactId, userId, token) => {
    return fetch(`${API}/contact/${contactId}/${userId}`, {
        method: "GET",
        Aheaders: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

//delete contact
export const deleteContact = (contactId, userId, token) => {
    return fetch(`${API}/contact/${contactId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}