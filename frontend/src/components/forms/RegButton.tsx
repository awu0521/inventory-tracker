import { useState } from "react";

interface RegButtonProps {
    handleRegisterToTag: () => void;
}

export function RegButton({ handleRegisterToTag }: RegButtonProps) {
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
        handleRegisterToTag();
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                className="absolute right-10 top-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-3 py-3 text-sm font-medium text-white hover:bg-green-500"
            >
                Register to a Tag
            </button>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="rounded-xl bg-white p-8 shadow-xl max-w-lg w-full text-center">
                        <h2 className="text-xl font-bold mb-3">Place your RFID tag on the scanner now.</h2>
                        <p className="text-gray-600 mb-6">
                            Once detected, this shipment will be registered to the scanned tag.
                        </p>
                        <div className="flex justify-center gap-3 mt-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-500"
                            >
                                Done
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
