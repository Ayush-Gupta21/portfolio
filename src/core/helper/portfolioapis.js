import {API} from "../../backend"

export const getAllPortfolios = () => {
    return fetch(`${API}/portfolios`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const createaPortfolio = (userId, token, portfolio) => {
    return fetch(`${API}/create/portfolio/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: portfolio
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deletePortfolio = (portfolioId, userId, token) => {
    return fetch(`${API}/portfolio/${portfolioId}/${userId}`, {
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

export const getPortfolio = (portfolioId) => {
    return fetch(`${API}/portfolio/${portfolioId}`, {
        method: "GET",
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}

export const updatePortfolio = (portfolioId, userId, token, portfolio) => {
    return fetch(`${API}/portfolio/${portfolioId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: portfolio
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}