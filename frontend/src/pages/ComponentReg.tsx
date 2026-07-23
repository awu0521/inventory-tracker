import { useEffect, useState, Component } from "react";
import { itemTypeNames } from "../constants/itemTypes";
import axios from "axios";
import ErrorAlert from "../components/forms/ErrorAlert";
import {DescInput, DimensionInput, NameInput, TypeInput, WeightInput} from "../components/forms/ComponentInputs";
import { CreateComponentButton } from "../components/forms/CreateComponentButton";

const QUEUE_PORT = "http://localhost:3000/api/components-queue";
const REG_PORT = "http://localhost:3000/api/reg-component";

function ComponentReg() {
    const [components, setComponents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contents: [],
        weight: 0,
        type: '',
        dimensions: { length: 0, width: 0, height: 0 },
        desc: '',
    });

    const fetchComponents = async () => {
        try {
            const response = await axios.get(QUEUE_PORT);

            console.log("Response:", response.data);
            
            setComponents(response.data.components);
        } catch (error) {
            console.error("Error fetching components:", error);

            setError(true);
        }
    };

    const handleCreateComponent = async () => {
        const itemComponentJSON = {
            name: formData.name,
            contents: formData.contents,
            weight: formData.weight,
            type: formData.type,
            dimensions: formData.dimensions,
            desc: formData.desc,
        };

        try {
            const response = await axios.post(REG_PORT, itemComponentJSON);

            console.log("Component created:", response.data);

            // refreshes the queue on the frontend
            fetchComponents();

        } catch (error) {
            console.error("Invalid component:", error);
        }
    };

    useEffect(() => {
        fetchComponents();
    }, []);

    const filteredComponents = components.filter((component) =>
        component.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center gap-8 py-20">
            {/*&&<ErrorAlert error={error} setError={setError} />*/}
            {error}

            <h1 className="text-3xl font-bold" >
                Item Component Registration
            </h1>
            <div className="border rounded-lg p-6 shadow-md">
                <div className="flex gap-3 py-2">
                    <NameInput formData={formData} setFormData={setFormData}/>
                    <WeightInput formData={formData} setFormData={setFormData}/>
                    <DimensionInput formData={formData} setFormData={setFormData}/>
                </div>
                <TypeInput formData={formData} setFormData={setFormData}/>
                <DescInput formData={formData} setFormData={setFormData}/>
                <CreateComponentButton handleCreateComponent={handleCreateComponent}/>
            </div>
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