import axios from 'axios';

export const NEST_API_URL = 'http://localhost:3001/api/v1';

export const cardsApiClient = axios.create({
    baseURL: NEST_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
