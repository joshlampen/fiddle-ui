import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import AuthButton from './components/AuthButton';
import API_ENDPOINTS from '../../services/apiEndpoints';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'universal-cookie';

const emptyFunction = () => {};

const AuthButtonContainer = ({ onSetAuthId = emptyFunction }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const _onAuthorize = useCallback(() => {
        if (isSubmitting) {
            return;
        }

        const authId = uuidv4();
        const cookies = new Cookies();

        setIsSubmitting(true);
        let popup = window.open(
            `${API_ENDPOINTS.spotify.authorize}?auth_id=${authId}`,
            'SpotifyAuth',
            'width=800,height=700'
        );

        const windowInterval = setInterval(() => {
            if (popup.closed) {
                clearInterval(windowInterval);
                popup = undefined;
                setIsSubmitting(false);
                onSetAuthId(authId);
                cookies.set('fiddle', authId);
            }
        }, 1000);
    }, [isSubmitting, onSetAuthId]);

    return (
        <AuthButton isSubmitting={isSubmitting} onAuthorize={_onAuthorize} />
    );
};

AuthButtonContainer.propTypes = {
    onSetAuthId: PropTypes.func.isRequired,
};

export default AuthButtonContainer;
