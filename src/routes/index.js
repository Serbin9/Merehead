import React from 'react';

const Home = React.lazy(() =>
  import('../components/Home' /* webpackChunkName: "Home" */),
);
const UserForm = React.lazy(() =>
  import('../components/UserForm' /* webpackChunkName: "UserForm" */),
);

const repositori = '';
const routes = {
  HomePage: {
    path: `${repositori}/`,
    component: Home,
  },
  CreatePage: {
    path: `${repositori}/create`,
    component: UserForm,
  },
  EditPage: {
    path: `${repositori}/edit/:id`,
    to: `${repositori}/edit/`,
    component: UserForm,
  },
};
export default routes;
