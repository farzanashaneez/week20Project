import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/dashboard";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminSignin from "./pages/AdminSignin";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/admin/signin" element={<AdminSignin />} />

        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
