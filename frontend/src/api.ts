import axios from 'axios';

const API_BASE_URL = 'http://localhost:4001';


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
    // if (response.data.authToken) {
    //     localStorage.setItem('authToken', response.data.authToken);
    // }
    return response.data;
};

export const createNote = async (accessToken: string | null, noteData: string, completed: boolean) => {
    console.log(accessToken);
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
    console.log(accessToken);
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
