import { types } from '../../../reducers/constants';
import * as apiService from '../../../services/apiService';
import of from '../../../utils/awaitOf';

const actions = {
    onGetUser: (authId) => async (dispatch) => {
        const [resp = {}, error] = await of(apiService.getUser(authId));
        if (error) {
            throw error;
        }

        const { data: user = {} } = resp;
        dispatch({ type: types.SET_USER, user });
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

        dispatch({ type: types.SET_PLAYLISTS, playlists });
    },
    // onSetPlayerTrack: (uri) => ({
    //     type: types.SET_PLAYER_TRACK,
    //     uri,
    // }),
};

export default actions;
