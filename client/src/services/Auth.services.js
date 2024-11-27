import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const registerUser = async (user) => {
    const response = await axios.post(`${API_URL}/auth/register`, user, { withCredentials: true });
    return response
};

export const loginUser = async (credentials) => {
    return await axios.post(`${API_URL}/auth/login`, credentials, { withCredentials: true });
};

export const logoutUser = async () => {
    return await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};
