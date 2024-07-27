import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Problem2 from "./pages/Problem2";
import Problem3 from "./pages/Problem3";
import Problem1n4 from "./pages/Problem1n4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/problem1n4" element={<Problem1n4 />} />
          <Route path="/problem2" element={<Problem2 />} />
          <Route path="/problem3" element={<Problem3 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
