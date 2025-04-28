import axios, { AxiosInstance } from "axios";
// import { useUserDataStore } from './UserData.store';

// Determinar la URL de base desde las variables de entorno o usar el valor predeterminado


// const baseURL: string = 'https://alatheia-api.gty.cl/'
const baseURL: string = 'https://alatheia-dev.gty-apis.cl/';

// Crear una instancia de Axios con la URL de base
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});

// Añadir un interceptor para incluir el token en las cabeceras de autorización
axiosInstance.interceptors.request.use(
    (config) => {
        // Obtener el token del store de Zustand
        // const token = useUserDataStore.getState().token;
        const token = "602c0f8210e02cbc61adbf09f93de329ceb04378"; 
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;