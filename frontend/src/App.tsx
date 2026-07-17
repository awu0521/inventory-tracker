import axios from "axios";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const BACKEND_PORT = "http://localhost:3000";

// TODO: use App.tsx to manage all pages and routing instead of for home page.
function App() {
    const [array, setArray] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(BACKEND_PORT)
        setArray(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        // add <Routes> {path} </Routes> inside of Browser Router to add more pages
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
        // {array}
    );
}

export default App
