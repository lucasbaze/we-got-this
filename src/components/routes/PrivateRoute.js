import PermissionChecker from 'modules/auth/permissionChecker';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStateValue } from '../../state';
import { routes } from '../../constants/routes';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [{ user }] = useStateValue();

    return (
        <Route
            {...rest}
            render={props => {
                if (!user.isAuthenticated) {
                    return <Redirect to={routes.AUTH} />;
                }
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
