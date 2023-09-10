import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieList from "./Component/MovieList";
import MovieDetails from "./Component/MovieDetails";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
