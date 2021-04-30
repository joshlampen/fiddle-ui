import React from "react";
import PropTypes from "prop-types";

const emptyFunction = () => {};

const AuthButton = ({ isSubmitting, onAuthorize = emptyFunction }) => {
    return (
        <button disabled={isSubmitting} onClick={onAuthorize}>
            Authorize
        </button>
    );
};

AuthButton.propTypes = {
    isSubmitting: PropTypes.bool,
    onAuthorize: PropTypes.func.isRequired,
};

export default AuthButton;
