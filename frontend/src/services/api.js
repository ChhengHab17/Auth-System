import axios from 'axios';

// Axios interceptor to add JWT token to Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const API_URL = 'http://localhost:5000/api';


export const signup = async (username, email, password) =>{
    try{
        const result = await axios.post(`${API_URL}/auth/signup`,{
            username,
            email,
            password,
        })
        return result.data;
    }catch(error){
        console.log(error);
        throw(error);
    }
}

export const signin = async (email, password) => {
    try{
        const result = await axios.post(`${API_URL}/auth/signin`,{
            email,
            password
        })
        return result.data;
    }catch(error){
        console.log(error);
        throw(error);
    }
}

export const sendCode = async (email) => {
    try{
        const token = localStorage.getItem("token");
        const result = await axios.patch(`${API_URL}/auth/verification-code`, {
            email
        })
        return result.data;
    }catch(error){
        console.log(error);
        throw(error);
    }
}

export const verifyCode = async (email, providedCode) => {
    try {
        const result = axios.patch(`${API_URL}/auth/verify-code`,{
            email,
            providedCode
        })
        return (await result).data;
    } catch (error) {
        console.log(error);
        throw(error);
    }
}