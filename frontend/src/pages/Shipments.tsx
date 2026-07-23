import { useEffect, useState } from "react";
import { shipmentStatusNames } from "../constants/shipmentStatuses";

function Shipments() {
    const [shipments, setShipments] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/shipments")
            .then((response) => response.json())
            .then((data) => {
                console.log("Shipments received:", data);
                setShipments(data);
            })
            .catch((error) => {
                console.error("Error fetching shipments:", error);
            });
    }, []);

    const filteredShipments = shipments.filter((shipment) =>
        shipment.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center gap-8 py-20">
            <h1 className="text-3xl font-bold">
                Shipments
            </h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search shipments by name..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-3/4 rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="w-3/4 rounded-xl bg-white shadow-md p-6">
                {filteredShipments.length === 0 ? (
                    <p className="text-gray-500">
                        No components found
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

export default Shipments;