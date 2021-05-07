import { types } from './constants';
import * as apiService from '../services/apiService';
import of from '../utils/awaitOf';

const initialState = {
    hasSpotifyData: false,
    authId: '',
    playerTrackUri: '',
    user: {},
    friendsMap: {},
    playlistsMap: {},
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
        case types.SET_FRIENDS:
            return {
                ...state,
                friendsMap: { ...action.friendsMap },
            };
        case types.SET_TRACKS:
            return {
                ...state,
                tracks: [...action.tracks],
            };
        case types.SET_PLAYLISTS:
            return {
                ...state,
                playlistsMap: { ...action.playlistsMap },
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

    onSetAuthId: (authId) => ({ type: types.SET_AUTH_ID, authId }),

    onCompleteSpotifyDataRetrieval: () => ({
        type: types.SPOTIFY_DATA_RETRIEVAL_COMPLETE,
    }),

    onGetUser: (authId) => async (dispatch) => {
        const [resp = {}, error] = await of(apiService.getUser(authId));
        if (error) {
            throw error;
        }

        const { data: user = {} } = resp;
        dispatch({ type: types.SET_USER, user });
    },

    onGetFriends: (userId) => async (dispatch) => {
        const [resp = {}, error] = await of(apiService.getFriends(userId));

        if (error) {
            throw error;
        }

        const { data: friends = [] } = resp;
        const friendsMap = {};

        for (const friend of friends) {
            friendsMap[friend.id] = friend;
        }

        dispatch({ type: types.SET_FRIENDS, friendsMap });
    },

    onGetTracks: (userId) => async (dispatch) => {
        const [resp = {}, error] = await of(apiService.getTracks(userId));
        if (error) {
            throw error;
        }

        const { data: tracks = [] } = resp;

        dispatch({ type: types.SET_TRACKS, tracks });
    },

    onGetPlaylists: (userId) => async (dispatch) => {
        const [resp = {}, error] = await of(apiService.getPlaylists(userId));
        if (error) {
            throw error;
        }

        const { data: playlists = [] } = resp;
        const playlistsMap = {};

        for (const playlist of playlists) {
            playlistsMap[playlist.id] = playlist;
        }

        dispatch({ type: types.SET_PLAYLISTS, playlistsMap });
    },
};

export default reducer;
