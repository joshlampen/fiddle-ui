import React from 'react';
import PropTypes from 'prop-types';

import './header.less';

const emptyObject = {};

const Header = ({ user = emptyObject }) => {
    return (
        <div className="header">
            <div className="header__logo">fiddle</div>
            <div className="header__profile">
                <img
                    className="header__profile__photo"
                    src={user.spotify_image_url}
                />
                <div className="header__profile__name">{user.display_name}</div>
            </div>
        </div>
    );
};

Header.propTypes = {
    user: PropTypes.object,
};

export default Header;
