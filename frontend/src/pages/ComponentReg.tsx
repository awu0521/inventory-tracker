import { useEffect, useState } from "react";
import { itemTypeNames } from "../constants/itemTypes";
import axios from "axios";

function ComponentReg() {
    const [components, setComponents] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
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
            const response = await axios.get(
                "http://localhost:3000/api/components-queue"
            );

            setComponents(response.data);
        } catch (error) {
            console.error("Error fetching components:", error);
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
            const response = await axios.post(
                "http://localhost:3000/api/component-reg",
                itemComponentJSON
            );

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
            <h1 className="text-3xl font-bold" >
                Item Component Registration
            </h1>
            <div className="border rounded-lg p-6 shadow-md">
                <div className="flex gap-3 py-2">
                    <div>
                        <label className="block">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    name: event.target.value,
                                })
                            }
                            className="w-48 border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block">Weight</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={(event) =>
                                setFormData({
                                    ...formData,
                                    weight: event.target.valueAsNumber,
                                })
                            }
                            className="w-24 border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block">{"Dimensions (L x W x H)"}</label>

                        <div className="flex gap-2">
                            <input
                                type="number"
                                name="length"
                                placeholder="L"
                                value={formData.dimensions.length}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        dimensions: {
                                            ...formData.dimensions,
                                            length: event.target.valueAsNumber,
                                        },
                                    })
                                }
                                className="w-20 border rounded px-3 py-2"
                                required
                            />

                            <input
                                type="number"
                                name="width"
                                placeholder="W"
                                value={formData.dimensions.width}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        dimensions: {
                                            ...formData.dimensions,
                                            width: event.target.valueAsNumber,
                                        },
                                    })
                                }
                                className="w-20 border rounded px-3 py-2"
                                required
                            />

                            <input
                                type="number"
                                name="height"
                                placeholder="H"
                                value={formData.dimensions.height}
                                onChange={(event) =>
                                    setFormData({
                                        ...formData,
                                        dimensions: {
                                            ...formData.dimensions,
                                            height: event.target.valueAsNumber,
                                        },
                                    })
                                }
                                className="w-20 border rounded px-3 py-2"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-5 mb-4">
                    <label className="block">Type:</label>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={(event) =>
                            setFormData({
                                ...formData,
                                type: event.target.value,
                            })
                        }
                        className="border rounded px-3 py-2"
                    >
                        <option value="FRAGILE">FRAGILE</option>
                        <option value="ORGANIC">ORGANIC</option>
                        <option value="DOCUMENT">DOCUMENT</option>
                        <option value="BULK">BULK</option>
                    </select>
                </div>
                <label className="block">{"Description (optional)"}</label>
                <input
                    type="text"
                    name="desc"
                    value={formData.desc}
                    onChange={(event) =>
                        setFormData({
                            ...formData,
                            desc: event.target.value,
                        })
                    }
                    className="w-full border rounded px-3 py-1"
                    required
                />
                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={handleCreateComponent}
                        className="bg-blue-500 px-4 py-2 rounded"
                    >
                        Create Shipment
                    </button>
                </div>
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