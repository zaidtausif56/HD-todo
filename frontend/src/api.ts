import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const sendOtp = async (email: string, page: 'signup' | 'login') => {
    const response = await axios.post(`${API_BASE_URL}/auth/sendotp`, { email, page });
    return response.data;
};

export const signup = async (name: string, dob: string, email: string, otp: string, otpToken: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, { name, dob, email, otp, otpToken });
    return response.data;
};

export const login = async (email: string, otp: string, otpToken: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, otp, otpToken });
    return response.data;
};

export const createNote = async (accessToken: string | null, noteData: string, completed: boolean) => {
    const response = await axios.post(`${API_BASE_URL}/notes/create`, { notedata: noteData, completed }, {
        headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return response.data;
};

export const deleteNote = async (accessToken: string | null, noteId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/notes/delete/${noteId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return response.data;
};

export const viewNotes = async (accessToken: string | null) => {
    const response = await axios.post(`${API_BASE_URL}/notes/view`, {}, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
};
