import axios from 'axios';
import API_ENDPOINTS from './apiEndpoints';

export const getUser = (authId) => {
    const params = { auth_id: authId };
    return axios.get(API_ENDPOINTS.users, { params });
};

export const getFriends = (userId) => {
    const params = { user_id: userId };
    return axios.get(API_ENDPOINTS.friends, { params });
};

export const getTracks = (userId) => {
    const params = { user_id: userId };
    return axios.get(API_ENDPOINTS.tracks, { params });
};

export const getPlaylists = (userId) => {
    const params = { user_id: userId };
    return axios.get(API_ENDPOINTS.playlists, { params });
};
