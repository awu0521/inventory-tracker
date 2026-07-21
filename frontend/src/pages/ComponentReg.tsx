import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { itemTypeNames } from "../constants/itemTypes";

function ComponentReg() {
    const navigate = useNavigate();
    const [components, setComponents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleClick = (buttonName: string) => {
        console.log(`${buttonName} clicked`);
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/components-queue")
            .then((response) => response.json())
            .then((data) => {
                setComponents(data);
            })
            .catch((error) => {
                console.error("Error fetching components:", error);
            });
    }, []);

    const filteredComponents = components.filter((component) =>
        component.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center gap-8 py-20">
            <h1 className="text-3xl font-bold">
                Queued Item Components
            </h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search queued components by name..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-3/4 rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="w-3/4 rounded-xl bg-white shadow-md p-6">
                {filteredComponents.length === 0 ? (
                    <p className="text-gray-500">
                        No queued components found
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {filteredComponents.map((component, index) => (
                            <li
                                key={index}
                                className="rounded-lg border p-4 hover:bg-gray-50"
                            >
                                <p className="font-semibold text-lg">
                                    {component.name}
                                </p>
                                <p>Type: {itemTypeNames[component.type]}</p>
                                <p>Description: {component.desc}</p>
                                <p>Weight: {component.weight}</p>
                                <p>Dimensions:
                                    {` ${component.dimensions.length} x ${component.dimensions.width} x ${component.dimensions.height}`}
                                </p>

                                {/* Only displays for ItemContainers */}
                                {component.contents && (
                                    <div className="mt-4">
                                        <p className="font-semibold">
                                            Contents:
                                        </p>

                                        <ul className="list-disc ml-6">
                                            {/* TODO: fix components not showing for item component contents */}
                                            {component.contents.map((item: any, index: number) => (
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

export default ComponentReg;