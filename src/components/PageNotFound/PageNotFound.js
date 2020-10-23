import React from 'react';

import './PageNotFound.scss';

const PageNotFound = () => (
    <div className="c-page-not-found">
        <div className="c-page-not-found__message">
            <h1>Fehler 404</h1>
            <div>Hier gibt es nichts zu sehen! Die angefragte Seite existiert nicht.</div>
        </div>
    </div>
);

export default PageNotFound;
