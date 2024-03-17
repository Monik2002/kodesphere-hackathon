import FanControl from "./FanControl";
import BulbControl from "./BulbControl";
import LedControl from "./LedControl";
import ACControl from "./ACControl";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Smart Home Control Panel</h1>
      <div className="device-container">
        <FanControl />
        <BulbControl />
        <LedControl />
        <ACControl />
      </div>
    </div>
  );
}

export default App;
