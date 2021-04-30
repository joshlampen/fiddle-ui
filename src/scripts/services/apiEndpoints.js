import { formatApiUrl, formatSpotifyApiUrl } from '../utils/formatUrl';

const apiBase = formatApiUrl();
const spotifyApiBase = formatSpotifyApiUrl();

const API_ENDPOINTS = {
    tracks: `${apiBase}/tracks`,

    spotify: {
        authorize: `${spotifyApiBase}/authorize`,
        users: `${spotifyApiBase}/users`,
        playlists: `${spotifyApiBase}/playlists`,
        tracksGet: `${spotifyApiBase}/tracks/get`,
        player: `${spotifyApiBase}/player`,
    },
};

export default API_ENDPOINTS;
