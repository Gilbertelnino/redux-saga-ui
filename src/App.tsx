import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Home from "./components/home/Home";
import AddUser from "./components/auth/AddUser";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "./components/auth/EditUser";
import ProductList from "./components/products/ProductList";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route
          path="users/:id"
          element={<ProtectedRoute component={EditUser} />}
        />
        <Route
          path="/new-user"
          element={<ProtectedRoute component={AddUser} />}
        />
        <Route
          path="/cart/products"
          element={<ProtectedRoute component={ProductList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
