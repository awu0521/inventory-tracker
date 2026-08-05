import { useLocation } from "react-router-dom";

function ComponentView() {
    const { state } = useLocation();

    const component = state.component;

    return (
        <div className="flex flex-col items-center gap-8 py-20">
            <h1 className="text-3xl font-bold">
                Component Details
            </h1>

            <div className="w-3/4 rounded-xl bg-white shadow-md p-6">
                <p className="font-semibold text-lg">
                    {component.name}
                </p>

                <div className="mt-4 space-y-2">
                    <p>
                        <span className="font-semibold">Type:</span>{" "}
                        {component.type}
                    </p>

                    <p>
                        <span className="font-semibold">Description:</span>{" "}
                        {component.desc}
                    </p>

                    <p>
                        <span className="font-semibold">Weight:</span>{" "}
                        {component.weight}
                    </p>

                    <p>
                        <span className="font-semibold">Dimensions:</span>{" "}
                        {`${component.dimensions.length} x ${component.dimensions.width} x ${component.dimensions.height}`}
                    </p>
                </div>

                {/* Only displays for ItemContainers */}
                {component.contents && (
                    <div className="mt-6">
                        <p className="font-semibold">
                            Contents:
                        </p>

                        <ul className="list-disc ml-6 mt-2">
                            {component.contents.map((item: any, index: number) => (
                                <li key={index}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ComponentView;