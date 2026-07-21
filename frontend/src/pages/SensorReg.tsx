import { useNavigate } from "react-router-dom";

function SensorReg() {
  const navigate = useNavigate();

  const handleClick = (buttonName: string) => {
    console.log(`${buttonName} clicked`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20">
      <div className="flex flex-wrap justify-center gap-6">
        <button
          onClick={() => handleClick("Test")}
          className="w-64 rounded-xl bg-white p-6 text-lg font-semibold shadow-md hover:shadow-xl hover:bg-gray-50 transition-all"
        >
          Test 3
        </button>
      </div>
    </div>
  );
}

export default SensorReg;