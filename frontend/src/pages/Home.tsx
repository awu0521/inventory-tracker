import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

  const handleClick = (buttonName: string) => {
    console.log(`${buttonName} clicked`);
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <button onClick={() => navigate("/")}>
          Automatic Inventory System
        </button>
        <button onClick={() => handleClick("Login")}>
          Login
        </button>
      </div>

      <div className="dashboard">
        <div className="button-row">
          <button
            onClick={() => handleClick("Register Item Component")}
          >
            Register Item Component
          </button>

          <button
            onClick={() => handleClick("Register Shipment")}
          >
            Register Shipment
          </button>

          <button
            onClick={() => handleClick("Register Sensor/Tag")}
          >
            Register Sensor/Tag
          </button>
        </div>

        <div className="button-row">
          <button
            onClick={() => handleClick("View All Item Components")}
          >
            View All Item Components
          </button>

          <button
            onClick={() => handleClick("View All Shipments")}
          >
            View All Shipments
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;