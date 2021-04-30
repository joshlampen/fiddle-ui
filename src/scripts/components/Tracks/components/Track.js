import React from 'react';
import PropTypes from 'prop-types';

import './track.less';

const emptyObject = {};
const emptyFunction = () => {};

const Track = ({
    index,
    playerTrackUri,
    track = emptyObject,
    onTogglePlay = emptyFunction,
    onSetPlayerTrack = emptyFunction,
}) => {
    const _onSetPlayerTrack = (uri) => () => {
        if (uri === playerTrackUri) {
            onTogglePlay();
            return;
        }

        onSetPlayerTrack(uri);
    };

    return (
        <div className="track">
            {index + 1}
            <button onClick={_onSetPlayerTrack(track.spotify_uri)}>Play</button>
            <img className="track__image" src={track.album.spotify_image_url} />
            <div className="track__name">
                <a href={track.spotify_url} target="_blank" rel="noreferrer">
                    {track.name}
                </a>
                <div className="track__name__artists">
                    {track.artists?.map((artist = {}, index) => (
                        <div key={`${index}-${artist.id}`}>
                            <a
                                key={`${track.id}-${artist.id}`}
                                href={artist.spotify_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {artist.name}
                            </a>
                            {index !== track.artists?.length - 1 && (
                                <span>,&nbsp;</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="track__album">
                <a
                    href={track.album?.spotify_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {track.album?.name}
                </a>
            </div>
            <div className="track__playlist">
                <a
                    href={track.playlist_spotify_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {track.playlist_name}
                </a>
            </div>
        </div>
    );
};

Track.propTypes = {
    index: PropTypes.number,
    playerTrackUri: PropTypes.string,
    track: PropTypes.object,
    onTogglePlay: PropTypes.func.isRequired,
    onSetPlayerTrack: PropTypes.func.isRequired,
};

export default Track;
