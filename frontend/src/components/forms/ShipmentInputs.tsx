interface InputProps {
    formData: {
        name: string;
        contents: any[];
        origin: string;
        dest: string;
        status: string;
        deadline: string;
    }
    setFormData: (value: React.SetStateAction<{
        name: string;
        contents: any[];
        origin: string;
        dest: string;
        status: string;
        deadline: string;
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

export function OriginInput({ formData, setFormData }: InputProps) {
    return (
        <div>
            <label className="block">Origin</label>
            <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={(event) =>
                    setFormData({
                        ...formData,
                        origin: event.target.value,
                    })
                }
                className="w-48 border rounded px-3 py-2"
                required
            />
        </div>
    );
}

export function DestInput({ formData, setFormData }: InputProps) {
    return (
        <div>
            <label className="block">Destination</label>
            <input
                type="text"
                name="dest"
                value={formData.dest}
                onChange={(event) =>
                    setFormData({
                        ...formData,
                        dest: event.target.value,
                    })
                }
                className="w-48 border rounded px-3 py-2"
                required
            />
        </div>
    );
}

export function StatusInput({ formData, setFormData }: InputProps) {
    return (
        <div className="flex justify-center mt-5 mb-4">
            <label className="block">Status</label>

            <select
                name="type"
                value={formData.status}
                onChange={(event) =>
                    setFormData({
                        ...formData,
                        status: event.target.value,
                    })
                }
                className="border rounded px-3 py-2"
            >
                <option value="INCOMING">INCOMING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="OUTGOING">OUTGOING</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="LOST">LOST</option>
                <option value="RETURNED">RETURNED</option>
            </select>
        </div>
    );
}

export function DeadlineInput({ formData, setFormData }: InputProps) {
    return (
        <div>
            <label className="block">Deadline</label>
            <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={(event) =>
                    setFormData({
                        ...formData,
                        deadline: event.target.value,
                    })
                }
                className="w-full border rounded px-3 py-1"
                required
            />
        </div>
    );
}