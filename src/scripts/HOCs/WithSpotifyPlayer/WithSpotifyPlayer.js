import React, { useEffect, useCallback, useRef, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { playTrack } from '../../services/spotifyApiService';
import { PLAYER_STATE_INTERVAL, PLAYER_CHECK_INTERVAL } from './constants';

const emptyObject = {};
const emptyArray = [];
const emptyFunction = () => {};

const WithSpotifyPlayer = ({
    authId,
    playerTrackUri,
    user = emptyObject,
    tracks = emptyArray,
    onSetPlayerTrack = emptyFunction,
    children: childComponent,
}) => {
    const playerRef = useRef(null);
    const deviceIdRef = useRef(null);
    const playerTrackUriRef = useRef(null);
    const tracksRef = useRef(null);

    const _onPlayNextTrack = useCallback(() => {
        const playerTrackUri = playerTrackUriRef.current;
        const tracks = tracksRef.current;

        const trackIndex = tracks.findIndex(
            (track) => track?.spotify_uri === playerTrackUri
        );
        const nextTrackIndex =
            trackIndex === tracks.length - 1 ? 0 : trackIndex + 1;
        const nextTrack = tracks[nextTrackIndex];

        onSetPlayerTrack(nextTrack.spotify_uri);
    }, [playerTrackUriRef, tracksRef]);

    const _onCheckPlayerState = useCallback(() => {
        if (!playerRef.current) {
            return;
        }

        const playerStateInterval = setInterval(() => {
            const player = playerRef.current;

            player
                .getCurrentState()
                .then((state) => {
                    if (!state) {
                        return;
                    }

                    const { position, duration } = state;

                    if (duration - position <= PLAYER_STATE_INTERVAL) {
                        _onPlayNextTrack();
                    }
                })
                .catch(() => clearInterval(playerStateInterval));
        }, PLAYER_STATE_INTERVAL);
    }, [playerRef, PLAYER_STATE_INTERVAL]);

    const _onCreateEventHandlers = (player) => {
        player.on('initialization_error', (e = {}) => {
            console.error(e);
        });
        player.on('authentication_error', (e = {}) => {
            console.error(e);
        });
        player.on('account_error', (e = {}) => {
            console.error(e);
        });
        player.on('playback_error', (e = {}) => {
            console.error(e);
        });

        // player.on("player_state_changed", (state = {}) => {
        //     console.log(state);
        // });

        player.on('ready', (data = {}) => {
            const { device_id: deviceId } = data;
            deviceIdRef.current = deviceId;
        });
    };

    const _onCheckForPlayer = useCallback(() => {
        if (!window.Spotify || playerRef.current) {
            return;
        }

        const playerCheckInterval = setInterval(() => {
            clearInterval(playerCheckInterval);

            const player = new window.Spotify.Player({
                name: 'Fiddle Web Player',
                getOAuthToken: (callback) => {
                    callback(user.token);
                },
            });
            playerRef.current = player;

            player.connect();
            _onCreateEventHandlers(player);
        }, PLAYER_CHECK_INTERVAL);
    }, [playerRef, user]);

    // Plays a track via spotify uri
    const _onPlay = useCallback(
        ({
            spotify_uri: spotifyUri,
            playerInstance: {
                _options: { getOAuthToken },
            },
        }) => {
            const deviceId = deviceIdRef.current;
            getOAuthToken(() => playTrack(authId, deviceId, spotifyUri));
        },
        [authId, deviceIdRef]
    );

    const _onTogglePlay = useCallback(() => {
        const player = playerRef.current;

        player.togglePlay();
    }, [playerRef]);

    useEffect(() => {
        playerTrackUriRef.current = playerTrackUri;
    }, [playerTrackUri]);

    useEffect(() => {
        tracksRef.current = tracks;
    }, [tracks]);

    // Check for player on load
    useEffect(() => {
        _onCheckForPlayer();
    }, [_onCheckForPlayer]);

    // Once player exists, check player state
    useEffect(() => {
        if (!playerRef.current) {
            return;
        }

        _onCheckPlayerState();
    }, [playerRef, _onCheckPlayerState]);

    // Play a track when we receive a new uri
    useEffect(() => {
        if (
            !playerTrackUriRef.current ||
            !playerRef.current ||
            !deviceIdRef.current
        ) {
            return;
        }

        const player = playerRef.current;
        const playerTrackUri = playerTrackUriRef.current;

        _onPlay({
            playerInstance: player,
            spotify_uri: playerTrackUri,
        });
    }, [playerTrackUri, playerRef, deviceIdRef, _onPlay]);

    const WrappedComponent = cloneElement(childComponent, {
        onTogglePlay: _onTogglePlay,
    });
    return WrappedComponent;
};

WithSpotifyPlayer.propTypes = {
    playerTrackUri: PropTypes.string,
    user: PropTypes.object,
    tracks: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.element,
};

export default WithSpotifyPlayer;
