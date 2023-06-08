import { useRoutes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const AppRoutes = () => {
  const routing = useRoutes([
    { 
      path: '/', 
      element: <Home /> 
    },
    { 
      path: '/login', 
      element: <Login /> 
    },
    { 
      path: '/register', 
      element: <Register /> 
    },
    { 
      path: '*', 
      element: <div>404 Not Found</div> 
    }
  ]);

  return routing;
};

export default AppRoutes;
