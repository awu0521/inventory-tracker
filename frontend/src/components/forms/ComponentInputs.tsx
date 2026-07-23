interface InputProps {
    formData: {
        name: string;
        contents: any[];
        weight: number;
        type: string;
        dimensions: {
            length: number;
            width: number;
            height: number;
        };
        desc: string;
    }
    setFormData: (value: React.SetStateAction<{
        name: string;
        contents: any[];
        weight: number;
        type: string;
        dimensions: {
            length: number;
            width: number;
            height: number;
        };
        desc: string;
    }>) => void;
}

export function NameInput({ formData, setFormData }: InputProps) {
    return (
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
    );
}

export function WeightInput({ formData, setFormData }: InputProps) {
    return (
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
    );
}

export function DimensionInput({ formData, setFormData }: InputProps) {
    return (
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
    );
}

export function TypeInput({ formData, setFormData }: InputProps) {
    return (
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
    );
}

export function DescInput({ formData, setFormData }: InputProps) {
    return (
        <div>
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
        </div>
    );
}