interface ErrorAlertProps {
    error: boolean;
    setError: (value: boolean) => void;
}

function ErrorAlert({ error, setError }: ErrorAlertProps) {
    if (!error) return null;

    return (
        <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg">
            <h2 className="font-bold">
                Oops! Something went wrong.
            </h2>
            <p>Please try again later.</p>

            <button
                className="mt-2 underline"
                onClick={() => setError(false)}
            >
                Close
            </button>
        </div>
    );
}

export default ErrorAlert;