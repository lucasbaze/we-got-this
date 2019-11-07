import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import routes from '../../constants/routes';

const RouteComponent = () => {
    return (
        <h1>Routes</h1>
        // <Switch>
        // 	<PrivateRoute exact path={routes.routes.CALENDAR} component={}/>
        // </Switch>
    );
};

export default RouteComponent;
