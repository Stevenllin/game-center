import React from 'react';
import { ROUTES } from './core/router';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LazySpinner from './common/components/Spinner/LazySpinner';
import RouterScrollToTop from 'app/common/components/Router/RouterScrollToTop';

const AppRoutes: React.FC = () => (
  <React.Suspense fallback={<LazySpinner />}>
    <BrowserRouter>
      <RouterScrollToTop />
      <Switch>
        <Route
          path={ROUTES.FEATURES}
          component={React.lazy(() => import('./feature/Feature'))}
        />
      </Switch>
    </BrowserRouter>
  </React.Suspense>
);

export default AppRoutes;
