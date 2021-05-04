import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import LoadingStatusDialog from './components/LoadingStatusDialog';
import {
    getUser,
    getPlaylists,
    getTracks,
} from '../../services/spotifyApiService';
import of from '../../utils/awaitOf';

const emptyFunction = () => {};

const LoadingStatusDialogContainer = ({
    authId,
    onCompleteSpotifyDataRetrieval = emptyFunction,
}) => {
    const [user, setUser] = useState({});
    const [playlists, setPlaylists] = useState([]);
    const [hasTracks, setHasTracks] = useState(false);

    useEffect(() => {
        if (!authId) {
            return;
        }

        const _onGetUser = async () => {
            const [resp = {}, error] = await of(getUser(authId));
            if (error) {
                throw error;
            }

            const { data: user = {} } = resp;
            setUser(user);
        };
        _onGetUser();
    }, [authId]);

    useEffect(() => {
        const hasUser = !!user.id;
        if (!hasUser) {
            return;
        }

        const _onGetPlaylists = async () => {
            const [resp = {}, error] = await of(
                getPlaylists(authId, user.id, user.spotify_id)
            );
            if (error) {
                throw error;
            }

            const { items: playlists = [] } = resp?.data;
            setPlaylists(playlists);
        };
        _onGetPlaylists();
    }, [authId, user.id, user.spotify_id]);

    useEffect(() => {
        const hasPlaylists = !!playlists.length;
        if (!hasPlaylists) {
            return;
        }

        const _onGetTracks = async () => {
            const [, tracksError] = await of(getTracks(authId, playlists));
            if (tracksError) {
                throw tracksError;
            }

            setHasTracks(true);
            onCompleteSpotifyDataRetrieval();
        };
        _onGetTracks();
    }, [playlists, authId, onCompleteSpotifyDataRetrieval]);

    return (
        <LoadingStatusDialog
            foo
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

const mapDispatchToProps = {};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(LoadingStatusDialogContainer);
