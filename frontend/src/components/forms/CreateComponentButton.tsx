interface ButtonProps {
    handleCreateComponent: () => Promise<void>;
}

export function CreateComponentButton({ handleCreateComponent }: ButtonProps) {
    return (
        <div className="flex justify-center mt-4">
            <button
                type="button"
                onClick={handleCreateComponent}
                className="bg-blue-500 px-4 py-2 rounded"
            >
                Create Component
            </button>
        </div>
    );
}