import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001'; // Replace with your backend's base URL

// Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// API methods
export const sendOtp = async (email: string, page: 'signup' | 'login') => {
    const response = await api.post('/auth/sendotp', { email, page });
    return response.data;
};

export const signup = async (name: string, dob: string, email: string, otp: string) => {
    const response = await api.post('/auth/signup', { name, dob, email, otp });
    return response.data;
};

export const login = async (email: string, otp: string) => {
    const response = await api.post('/auth/login', { email, otp });
    return response.data;
};

export const createNote = async (noteData: string, userId: string, completed: boolean) => {
    const response = await api.post('/notes/create', { notedata: noteData, userid: userId, completed });
    return response.data;
};

export const viewNotes = async (userid: string) => {
    const response = await api.post('/notes/view', { userid });
    return response.data;
}
export const updateNote = async (userid: string, completed: boolean) => {
    const response = await api.post('/notes/view', { userid, completed });
    return response.data;
}
export const deleteNote = async (noteId: string) => {
    const response = await api.delete(`/notes/delete/${noteId}`);
    return response.data;
};
