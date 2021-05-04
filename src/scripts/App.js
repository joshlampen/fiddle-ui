import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import AuthButton from './components/AuthButton';
import LoadingStatusDialog from './components/LoadingStatusDialog';
import Header from './components/Header';
import Tracks from './components/Tracks';
import { actions } from './reducers/app';
import Cookies from 'universal-cookie';

const emptyObject = {};
const emptyFunction = () => {};

const App = ({
    hasSpotifyData,
    authId,
    user = emptyObject,
    onSetAuthId = emptyFunction,
    onSetPlayerTrack = emptyFunction,
    onCompleteSpotifyDataRetrieval = emptyFunction,
}) => {
    const cookies = new Cookies();
    const cookie = cookies.get('fiddle');
    if (cookie) {
        onSetAuthId(cookie);
        onCompleteSpotifyDataRetrieval();
    }

    // const tracks = [
    //     {
    //         id: '5768adb4-ca21-40fc-bd46-232911da2d33',
    //         name: 'Wahiba - Powel Remix',
    //         duration_ms: 483647,
    //         added_at: '',
    //         spotify_uri: 'spotify:track:5lZr2KRvR8kjK1Kraki9Mj',
    //         spotify_url:
    //             'https://open.spotify.com/track/5lZr2KRvR8kjK1Kraki9Mj',
    //         artists: [
    //             {
    //                 name: 'Kora (CA)',
    //                 spotify_url:
    //                     'https://open.spotify.com/artist/7lHiOFpepHokhLTy6PNAL9',
    //             },
    //             {
    //                 name: 'Nic Falardeau',
    //                 spotify_url:
    //                     'https://open.spotify.com/artist/2QE4Nw81rJMoWjI9Uj2Vua',
    //             },
    //             {
    //                 name: 'Powel',
    //                 spotify_url:
    //                     'https://open.spotify.com/artist/7lswylDlldiV65bPXGD46m',
    //             },
    //         ],
    //         album: {
    //             name: 'Caddo',
    //             spotify_url:
    //                 'https://open.spotify.com/album/3MdJWAwDwwrtaOFy2Bbep8',
    //             spotify_image_url:
    //                 'https://i.scdn.co/image/ab67616d0000b27384f99b32f3239d435de88352',
    //         },
    //         playlist_name: 'chill electronic',
    //         playlist_spotify_url:
    //             'https://open.spotify.com/playlist/7qK2EHOiVsdL9ucQgCapV2',
    //     },
    // ];

    return (
        <div className="App">
            {authId ? (
                <>
                    {hasSpotifyData ? (
                        <>
                            <Header user={user} />
                            <Tracks onSetPlayerTrack={onSetPlayerTrack} />
                        </>
                    ) : (
                        <LoadingStatusDialog
                            onCompleteSpotifyDataRetrieval={
                                onCompleteSpotifyDataRetrieval
                            }
                        />
                    )}
                </>
            ) : (
                <AuthButton onSetAuthId={onSetAuthId} />
            )}
            {/* <Tracks
                playerTrackUri="spotify:track:5lZr2KRvR8kjK1Kraki9Mj"
                tracks={tracks}
            /> */}
        </div>
    );
};

App.propTypes = {
    hasSpotifyData: PropTypes.bool,
    authId: PropTypes.string,
    user: PropTypes.object,
    onSetAuthId: PropTypes.func.isRequired,
    onSetPlayerTrack: PropTypes.func.isRequired,
    onCompleteSpotifyDataRetrieval: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = { ...actions };

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(App);
