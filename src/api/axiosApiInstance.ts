import axios, { AxiosInstance } from 'axios';

const axiosApiInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1/dogs',
    timeout: 2000,
    headers: { 'X-Api-Key': 'fbtgLxePnxOSiArZtTXK5Q==TGGPmzudDV3Q306X' },
});

export default axiosApiInstance;
