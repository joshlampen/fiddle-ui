import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import tracksActions from './ducks/tracks';
import Tracks from './components/Tracks';
import WithSpotifyPlayer from '../../HOCs/WithSpotifyPlayer';

const emptyObject = {};
const emptyArray = [];
const emptyFunction = () => {};

const TracksContainer = ({
    authId,
    playerTrackUri,
    user = emptyObject,
    tracks = emptyArray,
    onGetUser = emptyFunction,
    onGetTracks = emptyFunction,
    // onGetPlaylists = emptyFunction,
    onSetPlayerTrack = emptyFunction,
}) => {
    useEffect(() => {
        onGetUser(authId);
    }, [onGetUser, authId]);

    useEffect(() => {
        if (!user.id) {
            return;
        }

        onGetTracks(user.id);
        // onGetPlaylists(user.id);
    }, [onGetTracks, user.id]);

    return (
        <WithSpotifyPlayer
            authId={authId}
            playerTrackUri={playerTrackUri}
            user={user}
            tracks={tracks}
            onSetPlayerTrack={onSetPlayerTrack}
        >
            <Tracks
                playerTrackUri={playerTrackUri}
                tracks={tracks}
                onSetPlayerTrack={onSetPlayerTrack}
            />
        </WithSpotifyPlayer>
    );
};

TracksContainer.propTypes = {
    authId: PropTypes.string,
    playerTrackUri: PropTypes.string,
    user: PropTypes.object,
    tracks: PropTypes.arrayOf(PropTypes.object),
    onGetUser: PropTypes.func.isRequired,
    onGetTracks: PropTypes.func.isRequired,
    onGetPlaylists: PropTypes.func.isRequired,
    onSetPlayerTrack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    ...tracksActions,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(TracksContainer);
