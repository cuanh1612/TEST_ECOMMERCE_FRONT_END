import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { accessToken } = useAuth();
  return (
    <div
      style={{
        background: "#f1f1f1",
      }}
    >
      {/* <Navbar /> */}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              accessToken ? <Navigate to="/products" replace /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              accessToken ? <Navigate to="/login" replace /> : <Register />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
