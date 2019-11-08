import Loader from 'components/Loader';
import Loadable from 'react-loadable';

export const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "Dashboard" */ 'Dashboard'),
  loading: Loader
});
