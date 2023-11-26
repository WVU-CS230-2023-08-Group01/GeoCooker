import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { AddRecipe } from "./components/AddRecipe"

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
        path: '/AddRecipe',
        element: <AddRecipe />
    }
];

export default AppRoutes;
