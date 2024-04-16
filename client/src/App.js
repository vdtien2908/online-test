import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Theme
import 'primereact/resources/themes/mira/theme.css';
// Core
import 'primereact/resources/primereact.min.css';
//icons
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { privateRoutes } from '~/routes';
import DefaultLayout from '~/layouts/DefaultLayout';

function App() {
    useEffect(() => {
        document.title = 'Online TEST';
    }, []);

    return (
        <div className="app">
            <Routes>
                {privateRoutes.map((route, index) => {
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
        </div>
    );
}

export default App;
