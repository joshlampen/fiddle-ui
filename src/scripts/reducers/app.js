import { types } from "./constants";

const initialState = {
    hasSpotifyData: false,
    authId: "",
    playerTrackUri: "",
    user: {},
    tracks: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_AUTH_ID:
            return {
                ...state,
                authId: action.authId,
            };
        case types.SPOTIFY_DATA_RETRIEVAL_COMPLETE:
            return {
                ...state,
                hasSpotifyData: true,
            };
        case types.SET_USER:
            return {
                ...state,
                user: { ...action.user },
            };
        case types.SET_TRACKS:
            return {
                ...state,
                tracks: [...action.tracks],
            };
        case types.SET_PLAYER_TRACK:
            return {
                ...state,
                playerTrackUri: action.uri,
            };
        default:
            return state;
    }
};

export const actions = {
    onSetPlayerTrack: (uri) => ({
        type: types.SET_PLAYER_TRACK,
        uri,
    }),
};

export default reducer;
