import { formatApiUrl, formatSpotifyApiUrl } from '../utils/formatUrl';

const apiBase = formatApiUrl();
const spotifyApiBase = formatSpotifyApiUrl();

const API_ENDPOINTS = {
    users: `${apiBase}/users`,
    tracks: `${apiBase}/tracks`,
    playlists: `${apiBase}/playlists`,

    spotify: {
        authorize: `${spotifyApiBase}/authorize`,
        users: `${spotifyApiBase}/users`,
        playlists: `${spotifyApiBase}/playlists`,
        tracksGet: `${spotifyApiBase}/tracks/get`,
        player: `${spotifyApiBase}/player`,
    },
};

export default API_ENDPOINTS;
