const NODE_ENV_PRODUCTION = 'production';
const env = process.env.NODE_ENV;

export const formatApiUrl = () => {
    let apiBase = 'http://localhost:8001';

    if (env === NODE_ENV_PRODUCTION) {
        apiBase = 'https://fiddle-spotify-api.herokuapp.com/';
    }

    return apiBase;
};

export const formatSpotifyApiUrl = () => {
    let apiBase = 'http://localhost:8000';

    if (env === NODE_ENV_PRODUCTION) {
        apiBase = 'https://fiddle-api.herokuapp.com/';
    }

    return apiBase;
};
