import React from 'react';
import Track from './Track';

const track = {
    id: '5768adb4-ca21-40fc-bd46-232911da2d33',
    name: 'Wahiba - Powel Remix',
    duration_ms: 483647,
    added_at: '',
    spotify_uri: 'spotify:track:5lZr2KRvR8kjK1Kraki9Mj',
    spotify_url: 'https://open.spotify.com/track/5lZr2KRvR8kjK1Kraki9Mj',
    artists: [
        {
            name: 'Kora (CA)',
            spotify_url:
                'https://open.spotify.com/artist/7lHiOFpepHokhLTy6PNAL9',
        },
        {
            name: 'Nic Falardeau',
            spotify_url:
                'https://open.spotify.com/artist/2QE4Nw81rJMoWjI9Uj2Vua',
        },
        {
            name: 'Powel',
            spotify_url:
                'https://open.spotify.com/artist/7lswylDlldiV65bPXGD46m',
        },
    ],
    album: {
        name: 'Caddo',
        spotify_url: 'https://open.spotify.com/album/3MdJWAwDwwrtaOFy2Bbep8',
        spotify_image_url:
            'https://i.scdn.co/image/ab67616d0000b27384f99b32f3239d435de88352',
    },
    playlist_name: 'chill electronic',
    playlist_spotify_url:
        'https://open.spotify.com/playlist/7qK2EHOiVsdL9ucQgCapV2',
};

export default {
    title: 'Track',
    component: Track,
};

const Template = (args) => <Track {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    index: 0,
    playerTrackUri: 'spotify:track:5lZr2KRvR8kjK1Kraki9Mj',
    track: track,
};
