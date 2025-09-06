import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AddItem from "./Items/AddItem";
import ItemDetails from "./Items/ItemDetails";
import ItemList from "./Items/ItemList";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Profile from "./Profile/Profile";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/add" element={ <ProtectedRoute><AddItem /></ProtectedRoute> } />
          <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute> } />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
