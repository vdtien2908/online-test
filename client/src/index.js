import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { Fragment } from 'react';
import reportWebVitals from '~/reportWebVitals';

import GlobalStyles from '~/components/GlobalStyles';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            >
                                {route.children &&
                                    route.children.map((child, index) => {
                                        const Comp = child.component;

                                        return (
                                            <Route
                                                key={index}
                                                path={child.path}
                                                element={<Comp />}
                                            />
                                        );
                                    })}
                            </Route>
                        );
                    })}
                </Routes>
                <App />
            </Router>
        </GlobalStyles>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
