import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { modalState } from '../redux/reducer';

function ProtectedRoute({ component: Component, user, modalState, ...rest }) {
    if (!user.email) {
        modalState(true)
    }
    return (
        <Route
            {...rest}
            render={props => {
                return user.email ? <Component {...props} /> : <Redirect to="/" />;
            }}
        />
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {modalState})(ProtectedRoute);