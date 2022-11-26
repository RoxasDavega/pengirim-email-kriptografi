import Home from '../views/pages/home';
import Login from '../views/pages/login';
import Register from '../views/pages/register';
import Sent from '../views/pages/sent';
import InboxDetail from '../views/pages/inbox-detail';
import SentDetail from '../views/pages/sent-detail';

const unAuthedRoutes = {
  '/': Login,
  '/regis': Register,
  '/login': Login,
};

const authedRoutes = {
  '/': Home,
  '/inbox': Home,
  '/sent': Sent,
  '/inbox-detail/:id': InboxDetail,
  '/sent-detail/:id': SentDetail,
};

export { authedRoutes, unAuthedRoutes };
