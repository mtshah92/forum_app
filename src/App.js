import { Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/home";
import { Post } from "./pages/post";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
