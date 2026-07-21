import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleClick = (buttonName: string) => {
    console.log(`${buttonName} clicked`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="flex flex-wrap justify-center gap-6">
        <button
          onClick={() => navigate("/component-reg")}
          className="w-64 rounded-xl bg-white p-6 text-lg font-semibold shadow-md hover:shadow-xl hover:bg-gray-50 transition-all"
        >
          Register Item Component
        </button>

        <button
          onClick={() => navigate("/shipment-reg")}
          className="w-64 rounded-xl bg-white p-6 text-lg font-semibold shadow-md hover:shadow-xl hover:bg-gray-50 transition-all"
        >
          Register Shipment
        </button>

        <button
          onClick={() => navigate("/sensor-reg")}
          className="w-64 rounded-xl bg-white p-6 text-lg font-semibold shadow-md hover:shadow-xl hover:bg-gray-50 transition-all"
        >
          Register Sensor/Tag
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <button
          onClick={() => navigate("/components-view")}
          className="w-64 rounded-xl bg-white p-6 text-lg font-semibold shadow-md hover:shadow-xl hover:bg-gray-50 transition-all"
        >
          View All Item Components
        </button>

        <button
          onClick={() => navigate("/shipments-view")}
          className="w-64 rounded-xl bg-white p-6 text-lg font-semibold shadow-md hover:shadow-xl hover:bg-gray-50 transition-all"
        >
          View All Shipments
        </button>
      </div>
    </div>
  );
}

export default Home;