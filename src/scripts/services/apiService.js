import axios from 'axios';
import API_ENDPOINTS from './apiEndpoints';

export const getTracks = (userId) => {
    const params = { user_id: userId };
    return axios.get(API_ENDPOINTS.tracks, { params });
};
