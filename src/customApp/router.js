import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from '../helpers/AsyncFunc';

export default function(url) {
  const routers = [];
  routers.push(
      <Route
        exact
        key="account"
        path={`${url}/account`}
        component={asyncComponent(() => import('./containers/user/userProfile'))}
      />,
      <Route
        exact
        key="course"
        path={`${url}/courses/:id`}
        component={asyncComponent(() => import('./containers/courses/course'))}
      />,
	  <Route
        exact
        key="grading"
        path={`${url}/grading/:id`}
        component={asyncComponent(() => import('./containers/grading/grading'))}
	    />,
      <Route
        exact
        key="coursesIndex"
        path={`${url}/courses`}
        component={asyncComponent(() => import('./containers/courses/courseCreate'))}
      />
  );
  return routers;
}
