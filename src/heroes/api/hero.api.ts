
import axios from 'axios';

// import del valor de la var de entorno
const BASE_URL = import.meta.env.VITE_API_URL;

//instancia de axios
export const heroApi = axios.create({
    baseURL: `${BASE_URL}/api/heroes`,
});

