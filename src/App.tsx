import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import BoardPage from "./pages/BoardPage/BoardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/:id" element={<BoardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
