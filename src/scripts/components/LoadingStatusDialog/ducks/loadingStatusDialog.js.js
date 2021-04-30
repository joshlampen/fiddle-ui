import { types } from '../../../reducers/constants';
import { getUser } from '../../../services/spotifyApiService';
import of from '../../../utils/awaitOf';

const actions = {
    onGetUser: (authId) => async (dispatch) => {
        const [resp = {}, error] = await of(getUser(authId));
        if (error) {
            throw error;
        }

        const { data: user = {} } = resp;
        dispatch({ type: types.SET_USER, user });
    },

    onCompleteSpotifyDataRetrieval: () => ({
        type: types.SPOTIFY_DATA_RETRIEVAL_COMPLETE,
    }),
};

export default actions;
