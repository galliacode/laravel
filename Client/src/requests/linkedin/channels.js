import axios from "axios";
import {apiUrl} from "../../config/api";

export const addChannel = (accessToken) => {
    return axios.post(`${apiUrl}/linkedin/channels/add`, {
                access_token: accessToken,
            }).then((response) => {
                return response.data;
            });
};