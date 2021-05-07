import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';

const emptyObject = {};

const HeaderContainer = ({ user = emptyObject }) => {
    return <Header user={user} />;
};

HeaderContainer.propTypes = {
    user: PropTypes.object,
};

export default HeaderContainer;
