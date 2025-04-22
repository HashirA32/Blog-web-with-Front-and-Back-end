import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  RouteIndex,
  RouteSignIn,
  RouteSignUp,
} from "./components/Helper/RouteNames";
import Layout from "./layout/Layout";
import Index from "./Pages/Index";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Index />} />
          </Route>
          <Route path={RouteSignUp} element={<SignUp />} />
          <Route path={RouteSignIn} element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
