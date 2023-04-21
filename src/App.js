import "./App.css";
import SearchPage from "./page/searchpage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <main>
          <h1>Search Anime Characters</h1>
          <SearchPage/>
        </main>} />
    </Routes>
  );
}

export default App;
