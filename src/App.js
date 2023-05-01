import "./App.css";
import SearchPage from "./page/searchpage";
import SearchTextBox from "./page/autoupdateSearchPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <main>
          <h1>Search Anime Characters</h1>
          {/* <SearchPage/> */}
          <SearchTextBox />
        </main>} />
    </Routes>
  );
}

export default App;
