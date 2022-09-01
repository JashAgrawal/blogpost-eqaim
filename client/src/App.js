import "./App.css";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Addblog from "./pages/addblog";
import BlogDetail from "./pages/blog";
import Home from "./pages/home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="blog/:blogId" element={<BlogDetail />} />
        <Route path="addBlog" element={<Addblog />} />
      </Routes>
    </div>
  );
}

export default App;
