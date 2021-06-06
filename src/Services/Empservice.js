import http from './httpService';
import { apiUrl } from "../config.json";

export function Empregistration(data) {
    const apiEndPoint = `${apiUrl}/empregistration`;
    console.log(apiEndPoint)
    return http.post(`${apiEndPoint}`, data);
}

