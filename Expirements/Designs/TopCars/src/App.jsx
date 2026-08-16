import { Routes, Route } from "react-router-dom";

import CarLayout from "./layouts/CarLayout";
import CarsPage from "./pages/CarsPage";
import CarDetailsPage from "./pages/CarDetailsPage";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<CarLayout />}
      >

        {/* / */}
        <Route
          index
          element={<CarsPage />}
        />

        {/* /cars/:id */}
        <Route
          path="cars/:id"
          element={<CarDetailsPage />}
        />

      </Route>

    </Routes>
  );
}

export default App;