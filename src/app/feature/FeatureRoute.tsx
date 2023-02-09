import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import LazySpinner from 'app/common/components/Spinner/LazySpinner';

const FeaturesRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<LazySpinner/>}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={ROUTES.FEATURES__QUIZ}
            component={React.lazy(() => import('./Feature/Quiz'))}
          />
          <Route
            exact
            path={ROUTES.FEATURES__OXO}
            component={React.lazy(() => import('./Feature/OXO'))}
          />
          <Redirect to={ROUTES.FEATURES__QUIZ} />
        </Switch>
      </BrowserRouter>
    </React.Suspense>
  )
}
export default FeaturesRoutes;
