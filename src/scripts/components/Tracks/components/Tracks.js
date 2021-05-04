import React from 'react';
import PropTypes from 'prop-types';
import Track from './Track';

import './tracks.less';

const emptyArray = [];
const emptyFunction = () => {};

const Tracks = ({
    playerTrackUri,
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
                    track={track}
                    onTogglePlay={onTogglePlay}
                    onSetPlayerTrack={onSetPlayerTrack}
                />
            ))}
        </div>
    );
};

Tracks.propTypes = {
    playerTrackUri: PropTypes.string,
    tracks: PropTypes.arrayOf(PropTypes.object),
    onTogglePlay: PropTypes.func.isRequired,
    onSetPlayerTrack: PropTypes.func.isRequired,
};

export default Tracks;
