import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import AuthButton from "./components/AuthButton";
import authButtonActions from "./ducks/authButton";
import { AUTH_WINDOW_URL } from "./constants";
import { v4 as uuidv4 } from "uuid";

const emptyFunction = () => {};

const AuthButtonContainer = ({ onSetAuthId = emptyFunction }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const _onAuthorize = useCallback(() => {
        if (isSubmitting) {
            return;
        }

        const authId = uuidv4();

        setIsSubmitting(true);
        let popup = window.open(
            `${AUTH_WINDOW_URL}?auth_id=${authId}`,
            "SpotifyAuth",
            "width=800,height=700"
        );

        const windowInterval = setInterval(() => {
            if (popup.closed) {
                clearInterval(windowInterval);
                popup = undefined;
                setIsSubmitting(false);
                onSetAuthId(authId);
            }
        }, 1000);
    }, [isSubmitting]);

    return (
        <AuthButton isSubmitting={isSubmitting} onAuthorize={_onAuthorize} />
    );
};

AuthButtonContainer.propTypes = {
    onSetAuthId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    ...authButtonActions,
};

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(AuthButtonContainer);
