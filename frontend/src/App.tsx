import axios from "axios";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ComponentReg from "./pages/ComponentReg";
import ShipmentReg from "./pages/ShipmentReg";
import SensorReg from "./pages/SensorReg";
import ItemComponents from "./pages/ItemComponents";
import Shipments from "./pages/Shipments";
import ComponentView from "./pages/ComponentView";
import { Toaster } from "react-hot-toast";

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
        <BrowserRouter>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: "18px",
                        padding: "16px",
                        minWidth: "300px",
                        background: "#4a4646ff",
                        color: "#fff",
                        borderRadius: "10px",
                    },
                }}
            />

            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/component-reg" element={<ComponentReg />} />
                    <Route path="/shipment-reg" element={<ShipmentReg />} />
                    <Route path="/sensor-reg" element={<SensorReg />} />
                    <Route path="/components-view" element={<ItemComponents />} />
                    <Route path="/shipments-view" element={<Shipments />} />

                    {/* TESTING FOR COMPONENT POPULATOR*/}
                    <Route path="/component-view" element={<ComponentView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
