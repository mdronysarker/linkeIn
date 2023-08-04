import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Loggedinuser from "./Privaterouter/Loggedin";
import Notloggedinuser from "./Privaterouter/Notloggedin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Loggedinuser />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Notloggedinuser />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
