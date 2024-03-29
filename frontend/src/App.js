import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard  from "./pages/User/Components/dashboard";
import Admin from "./pages/Admin/Admin";
import AddBook from "./pages/Admin/Components/addbook";
import Dashboard from "./pages/Admin/Components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Books from "./pages/Books/books";
import ManageBooks from "./pages/Admin/Components/managebooks";
import User from "./pages/User/user";
import PurchaseHistory from "./pages/User/Components/history";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "/", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      
        { path: "books", element: <Books />},
        {
          path: "admin",
          element: <ProtectedRoute roleRequired="admin" />,
          children: [
            {
              path: "",
              element: <Admin />,
              children: [
                { path: "add-book", element: <AddBook /> },
                { path: "dashboard", element: <Dashboard />},
                { path: "manage-books", element: <ManageBooks />},
              ],
            }
          ],
        },
        {
          path: "user",
          element: <ProtectedRoute roleRequired="user" />,
          children: [
            {
              path: "",
              element: <User />,
              children: [
                { path: "dashboard", element: <UserDashboard /> },
                { path: "history", element: <PurchaseHistory /> },
              ],
            }
          ],
        },
      ],
    },
  ]);
  return (
    <div >
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
