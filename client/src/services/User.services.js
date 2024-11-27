import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const bulkRegister = async (formData) => {
    const response = await axios.post(`${API_URL}/user/bulkregister`, formData, { withCredentials: true});
    return response;
}

export const createUser = async (userData) => {
    const response = await axios.post(`${API_URL}/user/create`, userData, {withCredentials: true})
    return response
}