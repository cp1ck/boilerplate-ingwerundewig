import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TagManager from 'react-gtm-module';

import Root from './views/Root';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PageLoader from './components/LoaderModule/PageLoader';

const {
    REACT_APP_GTM_ID
} = process.env;

if (REACT_APP_GTM_ID) {
    TagManager.initialize({
        gtmId: REACT_APP_GTM_ID,
        dataLayerName: 'PageDataLayer'
    });
}

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
