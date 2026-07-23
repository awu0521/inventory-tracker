import { useEffect, useState, Component } from "react";
import { itemTypeNames } from "../constants/itemTypes";
import axios from "axios";
import ErrorAlert from "../components/forms/ErrorAlert";
import { NameInput, OriginInput, DestInput, StatusInput, DeadlineInput } from "../components/forms/ShipmentInputs";
import { CreateShipmentButton } from "../components/forms/CreateShipmentButton";
import { shipmentStatusNames } from "../constants/shipmentStatuses";

// TODO: change ports to match endpoints for grabbing and adding to shipment queue
const QUEUE_PORT = "http://localhost:3000/api/shipments-queue";
const REG_PORT = "http://localhost:3000/api/reg-shipment";

function ShipmentReg() {
    // TODO: change to setShipments
    const [shipments, setShipments] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(false);
    // TODO: change formData to match ShipmentJSON
    const [formData, setFormData] = useState({
        name: '',
        contents: [],
        origin: '',
        dest: '',
        status: '',
        deadline: '',
    });

    const fetchShipments = async () => {
        try {
            const response = await axios.get(QUEUE_PORT);

            console.log("Response:", response.data);

            setShipments(response.data.shipments);
        } catch (error) {
            console.error("Error fetching shipments:", error);

            setError(true);
        }
    };

    // TODO: change formData to match ShipmentJSON and change name
    const handleCreateShipment = async () => {
        const shipmentJSON = {
            name: formData.name,
            contents: formData.contents,
            origin: formData.origin,
            dest: formData.dest,
            status: formData.status,
            deadline: formData.deadline,
        };

        try {
            const response = await axios.post(REG_PORT, shipmentJSON);

            console.log("Shipment created:", response.data);

            // refreshes the queue on the frontend
            fetchShipments();

        } catch (error) {
            console.error("Invalid shipment:", error);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    const filteredShipments = shipments.filter((shipment) =>
        shipment.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center gap-8 py-20">
            {/*&&<ErrorAlert error={error} setError={setError} />*/}
            {error}

            <h1 className="text-3xl font-bold" >
                Shipment Registration
            </h1>
            <div className="border rounded-lg p-6 shadow-md">
                <div className="flex gap-3 py-2">
                    <NameInput formData={formData} setFormData={setFormData}/>
                    <OriginInput formData={formData} setFormData={setFormData}/>
                    <DestInput formData={formData} setFormData={setFormData}/>
                </div>
                <StatusInput formData={formData} setFormData={setFormData}/>
                <DeadlineInput formData={formData} setFormData={setFormData}/>
                <CreateShipmentButton handleCreateShipment={handleCreateShipment}/>
            </div>
            <h1 className="text-3xl font-bold">
                Queued Shipments
            </h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search queued shipments by name..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-3/4 rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="w-3/4 rounded-xl bg-white shadow-md p-6">
                {filteredShipments.length === 0 ? (
                    <p className="text-gray-500">
                        No queued shipments found
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {filteredShipments.map((shipment, index) => (
                            <li
                                key={index}
                                className="rounded-lg border p-4 hover:bg-gray-50"
                            >
                                <p className="font-semibold text-lg">
                                    {shipment.name}
                                </p>
                                <p>Origin: {shipment.origin}</p>
                                <p>Destination: {shipment.dest}</p>
                                <p>Status: {shipmentStatusNames[shipment.status]}</p>
                                <p>Deadline: {new Date(shipment.deadline).toLocaleDateString("en-US", {
                                    month: "numeric",
                                    day: "numeric",
                                    year: "numeric",
                                })}</p>

                                {/* Only displays for ItemContainers */}
                                {shipment.contents && (
                                    <div className="mt-4">
                                        <p className="font-semibold">
                                            Contents:
                                        </p>

                                        <ul className="list-disc ml-6">
                                            {/* TODO: fix components not showing for item component contents */}
                                            {shipment.contents.map((item: any, index: number) => (
                                                <li key={index}>
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ShipmentReg;