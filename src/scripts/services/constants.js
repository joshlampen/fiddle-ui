const spotifyEndpoint = 'http://localhost:8000';
const apiEndpoint = 'http://localhost:8001';

const API_ENDPOINTS = {
    spotify: {
        users: `${spotifyEndpoint}/users`,
        playlists: `${spotifyEndpoint}/playlists`,
        tracksGet: `${spotifyEndpoint}/tracks/get`,
        player: `${spotifyEndpoint}/player`,
    },

    tracks: `${apiEndpoint}/tracks`,
};

export default API_ENDPOINTS;
