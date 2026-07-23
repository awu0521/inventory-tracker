interface ButtonProps {
    handleCreateShipment: () => Promise<void>;
}

export function CreateShipmentButton({ handleCreateShipment }: ButtonProps) {
    return (
        <div className="flex justify-center mt-4">
            <button
                type="button"
                onClick={handleCreateShipment}
                className="bg-blue-500 px-4 py-2 rounded"
            >
                Create Shipment
            </button>
        </div>
    );
}