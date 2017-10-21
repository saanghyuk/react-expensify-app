import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header'
//component: Component는 그냥 rename하는 거야
//...rest는 지금 아직 안쓴애들 다 펼쳐 주는 거야
//인자로 props다 들어가니깐 그냥 destructuring 해 주는 것
export const PrivateRoute = ({
                                 isAuthenticated,
                                 component: Component,
                                 ...rest
                             }) => (
    <Route {...rest} component={(props) => ( //여기서 props는 위 component겠지 
        isAuthenticated ? (
            <div>
               <Header />
               <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);