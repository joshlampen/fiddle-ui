import React from "react";
import PropTypes from "prop-types";

const LoadingStatusDialog = ({ hasUser, hasPlaylists, hasTracks }) => {
    return (
        <div>
            <div>Getting profile... {hasUser && <span>done</span>}</div>
            <div>Getting playlists... {hasPlaylists && <span>done</span>}</div>
            <div>Getting tracks... {hasTracks && <span>done</span>}</div>
        </div>
    );
};

LoadingStatusDialog.propTypes = {
    hasUser: PropTypes.bool,
    hasPlaylists: PropTypes.bool,
    hasTracks: PropTypes.bool,
};

export default LoadingStatusDialog;
