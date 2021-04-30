import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import tracksActions from './ducks/tracks';
import { getTracks } from '../../services/apiService';
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
    onGetTracks = emptyFunction,
    onSetPlayerTrack = emptyFunction,
}) => {
    useEffect(() => {
        onGetTracks(user.id);
    }, [user, getTracks]);

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
    onGetTracks: PropTypes.func.isRequired,
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
