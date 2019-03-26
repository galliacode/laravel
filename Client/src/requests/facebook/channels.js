import axios from "axios";
import {apiUrl} from "../../config/api";

export const addChannel = (accessToken) => {
    return axios.post(`${apiUrl}/facebook/channels/add`, {
                access_token: accessToken,
            }).then((response) => {
                return response.data;
            });
};

export const getAccounts = () => {
    return axios.get(`${apiUrl}/facebook/channels/accounts`)
    .then((response) => {
                return response.data;
            });
};

export const saveAccounts = (accounts) => {
    return axios.post(`${apiUrl}/facebook/channels/accounts/save`, {
                accounts
            }).then((response) => {
                return response.data;
            });
};

export const getAnalytics = (id, days=1) => {
    return axios.get(`${apiUrl}/facebook/analytics?id=${id}&days=${days}`)
        .then((response) => {
            return response.data;
        });
};

export const pageInsights = (id, startDate, endDate) => {
    return axios.get(`${apiUrl}/facebook/insights/page?id=${id}&startDate=${startDate}&endDate=${endDate}`)
        .then((response) => {
            return response.data;
        });
};

export const pageInsightsByType = (id, startDate, endDate, type) => {
    return axios.get(`${apiUrl}/facebook/insights/page/${type}?id=${id}&startDate=${startDate}&endDate=${endDate}`)
        .then((response) => {
            return response.data;
        });
};