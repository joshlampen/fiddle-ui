import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';

import './tracks.less';

const emptyArray = [];
const emptyObject = {};
const emptyFunction = () => {};

const Tracks = ({
    playerTrackUri,
    user = emptyObject,
    friendsMap = emptyObject,
    playlistsMap = emptyObject,
    tracks = emptyArray,
    onTogglePlay = emptyFunction,
    onSetPlayerTrack = emptyFunction,
}) => {
    return (
        <div className="tracks">
            {tracks.map((track = {}, index) => (
                <Track
                    key={`${index}-${track.id}`}
                    index={index}
                    playerTrackUri={playerTrackUri}
                    user={user}
                    track={track}
                    playlistsMap={playlistsMap}
                    friendsMap={friendsMap}
                    onTogglePlay={onTogglePlay}
                    onSetPlayerTrack={onSetPlayerTrack}
                />
            ))}
        </div>
    );
};

Tracks.propTypes = {
    playerTrackUri: PropTypes.string,
    user: PropTypes.object,
    friendsMap: PropTypes.object,
    playlistsMap: PropTypes.object,
    tracks: PropTypes.arrayOf(PropTypes.object),
    onTogglePlay: PropTypes.func.isRequired,
    onSetPlayerTrack: PropTypes.func.isRequired,
};

export default Tracks;
