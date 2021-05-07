import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import UseAnimations from 'react-useanimations';
import activity from 'react-useanimations/lib/activity';
import { ACTIVITY_ICON_COLOR } from '../constants';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import RelativeTime from '@yaireo/relative-Time';

import './track.less';

const emptyObject = {};
const emptyFunction = () => {};

const Track = ({
    index,
    playerTrackUri,
    user = emptyObject,
    track = emptyObject,
    playlistsMap = emptyObject,
    friendsMap = emptyObject,
    onTogglePlay = emptyFunction,
    onSetPlayerTrack = emptyFunction,
}) => {
    const ownersMap = { [user.id]: user, ...friendsMap };
    const [ownerId = ''] = track.owner_ids;
    const { [ownerId]: owner = {} } = ownersMap;
    const [playlistId = ''] = track.playlist_ids;
    const { [playlistId]: playlist = {} } = playlistsMap;
    const relativeTime = new RelativeTime();
    momentDurationFormatSetup(moment);
    const trackDuration = moment
        .duration(track.duration_ms, 'ms')
        .format('m:ss');
    const isPlaying = track.spotify_uri === playerTrackUri;
    const [isTrackHovered, setIsTrackHovered] = useState(false);
    const _onTrackMouseEnter = () => setIsTrackHovered(true);
    const _onTrackMouseLeave = () => setIsTrackHovered(false);

    const trackClassNames = classNames('track', {
        'track--hovered': isTrackHovered,
    });

    const nameClassNames = classNames('track__nameAndArtists__name', {
        'track__nameAndArtists__name--playing': isPlaying,
    });

    const artistsClassNames = classNames('track__nameAndArtists__artists', {
        'track__nameAndArtists__artists--hovered': isTrackHovered,
    });

    const albumContainerClassNames = classNames('track__albumContainer', {
        'track__albumContainer--hovered': isTrackHovered,
    });

    const ownerContainerClassNames = classNames('track__ownerContainer', {
        'track__ownerContainer--hovered': isTrackHovered,
    });

    const playlistContainerClassNames = classNames('track__playlistContainer', {
        'track__playlistContainer--hovered': isTrackHovered,
    });

    const _onSetPlayerTrack = (uri) => () => {
        if (uri === playerTrackUri) {
            onTogglePlay();
            return;
        }

        onSetPlayerTrack(uri);
    };

    return (
        <div
            className={trackClassNames}
            onMouseEnter={_onTrackMouseEnter}
            onMouseLeave={_onTrackMouseLeave}
        >
            <div className="track__action">
                {isPlaying ? (
                    <>
                        {isTrackHovered ? (
                            <span
                                className="track__action__button"
                                onClick={onTogglePlay}
                            >
                                <FontAwesomeIcon icon={faPause} />
                            </span>
                        ) : (
                            <UseAnimations
                                animation={activity}
                                strokeColor={ACTIVITY_ICON_COLOR}
                            />
                        )}
                    </>
                ) : (
                    <>
                        {isTrackHovered ? (
                            <span
                                className="track__action__button"
                                onClick={_onSetPlayerTrack(track.spotify_uri)}
                            >
                                <FontAwesomeIcon icon={faPlay} />
                            </span>
                        ) : (
                            <span className="track__action__index">
                                {index + 1}
                            </span>
                        )}
                    </>
                )}
            </div>
            <div className="track__imageContainer">
                <img
                    className="track__imageContainer__image"
                    src={track.album.spotify_image_url}
                />
            </div>
            <div className="track__nameAndArtists">
                <div className={nameClassNames}>{track.name}</div>
                <div className={artistsClassNames}>
                    {track.artists?.map((artist = {}, index) => (
                        <span
                            key={`${index}-${artist.id}`}
                            className="track__nameAndArtists__artists__artistContainer"
                        >
                            <a
                                className="track__nameAndArtists__artists__artistContainer__artist"
                                href={artist.spotify_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {artist.name}
                            </a>
                            {index !== track.artists?.length - 1 && (
                                <span>,&nbsp;</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>
            <div className={albumContainerClassNames}>
                <a
                    className="track__albumContainer__album"
                    href={track.album?.spotify_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {track.album?.name}
                </a>
            </div>
            <div className={ownerContainerClassNames}>
                <a
                    className="track__ownerContainer__owner"
                    href={owner.spotify_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {owner.display_name}
                </a>
            </div>
            <div className={playlistContainerClassNames}>
                <a
                    className="track__playlistContainer__playlist"
                    href={playlist.spotify_url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {playlist.name}
                </a>
            </div>
            <div className="track__addedAt">
                {relativeTime.from(new Date(track.added_at))}
            </div>
            <div className="track__duration">{trackDuration}</div>
        </div>
    );
};

Track.propTypes = {
    index: PropTypes.number,
    playerTrackUri: PropTypes.string,
    user: PropTypes.object,
    track: PropTypes.object,
    playlistsMap: PropTypes.object,
    friendsMap: PropTypes.object,
    onTogglePlay: PropTypes.func.isRequired,
    onSetPlayerTrack: PropTypes.func.isRequired,
};

export default Track;
