import axios from "axios";

export const axiosRequest = axios.create(
    {
        baseURL: import.meta.env.VITE_APP_API_URL
    }
)

export const apiUrl =  import.meta.env.VITE_APP_FILES_URL


axiosRequest.interceptors.request.use(
    (config) =>
    {
        const accessToken = localStorage.getItem("access_token")
        if(accessToken)
        {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) =>
    {
        return Promise.reject(error)
    }
)


