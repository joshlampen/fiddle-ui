import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import AuthButton from './components/AuthButton';
import LoadingStatusDialog from './components/LoadingStatusDialog';
import Header from './components/Header';
import Tracks from './components/Tracks';
import { actions } from './reducers/app';

const emptyObject = {};
const emptyFunction = () => {};

const App = ({
    hasSpotifyData,
    authId,
    user = emptyObject,
    onSetPlayerTrack = emptyFunction,
}) => {
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
                        <LoadingStatusDialog />
                    )}
                </>
            ) : (
                <AuthButton />
            )}
        </div>
    );
};

App.propTypes = {
    hasSpotifyData: PropTypes.bool,
    authId: PropTypes.string,
    user: PropTypes.object,
    onSetPlayerTrack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = { ...actions };

const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhance(App);
