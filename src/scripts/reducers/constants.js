import createActionTypes from 'redux-create-actiontype';

export const types = createActionTypes()(
    'SET_AUTH_ID',
    'SPOTIFY_DATA_RETRIEVAL_COMPLETE',
    'SET_USER',
    'SET_TRACKS',
    'SET_PLAYLISTS',
    'SET_PLAYER_TRACK'
);
