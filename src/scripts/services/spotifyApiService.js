import axios from 'axios';
import API_ENDPOINTS from './constants';

export const getUser = (authId) => {
    const params = { auth_id: authId };
    return axios.get(API_ENDPOINTS.spotify.users, { params });
};

export const getPlaylists = (authId, userId, spotifyId) => {
    const params = {
        auth_id: authId,
        user_id: userId,
        spotify_user_id: spotifyId,
    };
    return axios.get(API_ENDPOINTS.spotify.playlists, { params });
};

export const getTracks = (authId, playlists) => {
    const reqBody = { auth_id: authId, items: playlists };
    return axios.put(API_ENDPOINTS.spotify.tracksGet, reqBody);
};

export const playTrack = (authId, deviceId, spotifyUri) => {
    const params = {
        auth_id: authId,
        device_id: deviceId,
        spotify_uri: spotifyUri,
    };

    return axios.get(API_ENDPOINTS.spotify.player, { params });
};
