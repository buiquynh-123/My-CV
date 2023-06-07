import { Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/client/Client";
import AboutPage from "./pages/client/About/About";
import PortfolioPage from "./pages/client/Portfolio/Portfolio";
import { IProject } from "./interface/project";
import { useEffect, useState } from "react";
import { getProjects } from "./api/project";
import HomePage from "./pages/client/Home/Home";

function App() {
  const [projects, setProjects] = useState<IProject[]>([]);
  useEffect(() => {
    getProjects().then(({ data }) => {
      setProjects(data);
    });
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="/home" element={<HomePage projects={projects} />} />

          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/portfolio"
            element={<PortfolioPage projects={projects} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
