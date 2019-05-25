import { About } from './components/about';
import { Home } from './components/home';
import { Users } from './components/users';
import { RouteProps } from 'react-router';

export const routes: RouteProps[] = [
  { path: '/', component: Home, exact: true },
  { path: '/about/', component: About },
  { path: '/users/', component: Users }
];
