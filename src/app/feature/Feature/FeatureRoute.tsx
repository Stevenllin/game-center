import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import LazySpinner from 'app/common/components/Spinner/LazySpinner';

const FeaturesRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<LazySpinner/>}>
      <Switch>
        <Route
          exact
          path={ROUTES.FEATURES__QUIZ}
          component={React.lazy(() => import('./Quiz'))}
        />
        <Route
          exact
          path={ROUTES.FEATURES__OXO}
          component={React.lazy(() => import('./OXO'))}
        />
        <Route
          exact
          path={ROUTES.FEATURES__TZFE}
          component={React.lazy(() => import('./TZFE'))}
        />
        <Redirect to={ROUTES.FEATURES__QUIZ} />
      </Switch>
    </React.Suspense>
  )
}
export default FeaturesRoutes;
