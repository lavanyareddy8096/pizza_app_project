import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import MyOrders from "./pages/MyOrders";
import Verify from "./pages/Verify";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
         <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/verify/:token" element={<Verify />} />
      </Routes>
    </Router>
  );
}

export default App;