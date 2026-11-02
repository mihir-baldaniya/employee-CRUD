import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import InsertEmployee from "./pages/InsertEmployee";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insert" element={<InsertEmployee />} />
        <Route path="/update/:id" element={<InsertEmployee />} />
      </Routes>
    </>
  );
}

export default App;