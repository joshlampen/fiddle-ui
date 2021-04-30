import { types } from '../../../reducers/constants';
import { getTracks } from '../../../services/apiService';
import of from '../../../utils/awaitOf';

const actions = {
    onGetTracks: (userId) => async (dispatch) => {
        const [resp = {}, error] = await of(getTracks(userId));
        if (error) {
            throw error;
        }

        const { data: tracks = [] } = resp;

        dispatch({ type: types.SET_TRACKS, tracks });
    },
    // onSetPlayerTrack: (uri) => ({
    //     type: types.SET_PLAYER_TRACK,
    //     uri,
    // }),
};

export default actions;
