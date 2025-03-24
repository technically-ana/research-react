import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import About from "./views/AboutView";
import Home from "./views/HomeView";
import Dashboard from "./views/DashboardView.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App
