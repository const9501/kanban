import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BoardPage from "./pages/BoardPage/BoardPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/:id" element={<BoardPage />} />
      </Routes>
    </>
  );
};

export default App;
