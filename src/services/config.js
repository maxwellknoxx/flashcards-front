import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://flashcards-knoxx.herokuapp.com/api/'
})