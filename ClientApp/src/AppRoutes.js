import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { AuthenticationGuard } from "./components/Authentication/authentication-guard";
import  Profile  from "./components/Authentication/Profile"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
    },
    {
        path: '/Recipe',
        element: <FetchData />
    },
    {
        path: '/Profile',
        element: < Profile/>
    },
    //{
    //    path: '/AddRecipe',
    //    element: <AddRecipe />
    //}
];

export default AppRoutes;
