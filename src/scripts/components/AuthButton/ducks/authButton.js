import { types } from "../../../reducers/constants";

const actions = {
    onSetAuthId: (authId) => ({ type: types.SET_AUTH_ID, authId }),
};

export default actions;
