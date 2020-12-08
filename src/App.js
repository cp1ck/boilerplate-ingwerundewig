import React, { Fragment, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Root from './views/Root';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PageLoader from './components/LoaderModule/PageLoader';

const App = () => (
    <Fragment>
        <Router>
            {/* <AuthHeader /> */}
            <Suspense fallback={<PageLoader />}>
                <Switch>
                    <Route exact path="/404" component={PageNotFound} />
                    <Route path="/:path" component={Root} />
                    <Route path="/" component={Root} />
                </Switch>
            </Suspense>
        </Router>
    </Fragment>
);

export default App;
