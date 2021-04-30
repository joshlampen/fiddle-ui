import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import LoadingStatusDialog from './components/LoadingStatusDialog';
import loadingStatusDialogActions from './ducks/loadingStatusDialog.js';
import { getPlaylists, getTracks } from '../../services/spotifyApiService';
import of from '../../utils/awaitOf';

const emptyObject = {};
const emptyFunction = () => {};

const LoadingStatusDialogContainer = ({
    authId,
    user = emptyObject,
    onGetUser = emptyFunction,
    onCompleteSpotifyDataRetrieval = emptyFunction,
}) => {
    const [playlists, setPlaylists] = useState([]);
    const [hasTracks, setHasTracks] = useState(false);

    useEffect(() => {
        onGetUser(authId);
    }, [authId]);

    useEffect(async () => {
        const hasUser = !!user.id;
        if (!hasUser) {
            return;
        }

        const [resp = {}, error] = await of(
            getPlaylists(authId, user.id, user.spotify_id)
        );
        if (error) {
            throw error;
        }

        const { items: playlists = [] } = resp?.data;
        setPlaylists(playlists);
    }, [user, getPlaylists, authId]);

    useEffect(async () => {
        const hasPlaylists = !!playlists.length;
        if (!hasPlaylists) {
            return;
        }

        const [, tracksError] = await of(getTracks(authId, playlists));
        if (tracksError) {
            throw tracksError;
        }

        setHasTracks(true);
        onCompleteSpotifyDataRetrieval();
    });

    return (
        <LoadingStatusDialog
            hasUser={!!user.id}
            hasPlaylists={!!playlists.length}
            hasTracks={hasTracks}
        />
    );
};

LoadingStatusDialogContainer.propTypes = {
    authId: PropTypes.string,
    user: PropTypes.object,
    onGetUser: PropTypes.func.isRequired,
    onCompleteSpotifyDataRetrieval: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    ...loadingStatusDialogActions,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(LoadingStatusDialogContainer);
