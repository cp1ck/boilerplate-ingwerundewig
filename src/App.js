import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Root from './views/Root';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PageLoader from './components/LoaderModule/PageLoader';
// import AuthHeader from './components/Authentication/AuthHeader';
// import Login from './components/Authentication/Login';
// import Register from './components/Authentication/Register';
// import UserProfile from './components/Authentication/UserProfile';


const App = () => (
    <Fragment>
        <Router>
            {/* <AuthHeader /> */}
            <Suspense fallback={<PageLoader />}>
                <Switch>
                    <Route exact path="/404" component={PageNotFound} />
                    {/* <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/user" component={UserProfile} /> */}
                    <Route path="/:path" component={Root} />
                    <Route path="/" component={Root} />
                </Switch>
            </Suspense>
        </Router>
    </Fragment>
);

export default App;
