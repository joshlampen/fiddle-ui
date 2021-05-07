import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { actions } from '../../reducers/app';
import Tracks from './components/Tracks';
import WithSpotifyPlayer from '../../HOCs/WithSpotifyPlayer';

const emptyObject = {};
const emptyArray = [];
const emptyFunction = () => {};

const TracksContainer = ({
    authId,
    playerTrackUri,
    user = emptyObject,
    friendsMap = emptyObject,
    playlistsMap = emptyObject,
    tracks = emptyArray,
    onGetUser = emptyFunction,
    onGetFriends = emptyFunction,
    onGetTracks = emptyFunction,
    onGetPlaylists = emptyFunction,
    onSetPlayerTrack = emptyFunction,
}) => {
    useEffect(() => {
        onGetUser(authId);
    }, [onGetUser, authId]);

    useEffect(() => {
        if (!user.id) {
            return;
        }

        onGetFriends(user.id);
        onGetTracks(user.id);
        onGetPlaylists(user.id);
    }, [user.id, onGetFriends, onGetTracks, onGetPlaylists]);

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
                user={user}
                tracks={tracks}
                playlistsMap={playlistsMap}
                friendsMap={friendsMap}
                onSetPlayerTrack={onSetPlayerTrack}
            />
        </WithSpotifyPlayer>
    );
};

TracksContainer.propTypes = {
    authId: PropTypes.string,
    playerTrackUri: PropTypes.string,
    user: PropTypes.object,
    friendsMap: PropTypes.object,
    playlistsMap: PropTypes.object,
    tracks: PropTypes.arrayOf(PropTypes.object),
    onGetUser: PropTypes.func.isRequired,
    onGetFriends: PropTypes.func.isRequired,
    onGetTracks: PropTypes.func.isRequired,
    onGetPlaylists: PropTypes.func.isRequired,
    onSetPlayerTrack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    ...actions,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(TracksContainer);
