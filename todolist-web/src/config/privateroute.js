import {Switch, Redirect, Route} from 'react-router-dom';
import route from './route';
import React from 'react';


function PrivateRoute(props) {
    const allowAccess = route[props.status].allowAccess;
    const redirect = route[props.status].redirectRoute;

    return(
        <Switch>
            {allowAccess.map(routes => 
                <Route exact path={routes.url} key={routes.url}>
                    <routes.component setStatus = {props.setStatus}/>
                </Route>
            )}
            <Redirect to={redirect}/>
        </Switch>
    )
}

export default PrivateRoute;