import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import About from "./views/AboutView";
import Home from "./views/HomeView";
import Dashboard from "./views/DashboardView";
import Redirect from "./views/RedirectView";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/r/:id"
                    element={<Redirect />}
                />
            </Routes>
        </Router>
    );
}

export default App
