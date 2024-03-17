import "./App.css";
import Fan from "./Fan";
import Bulb from "./Bulb";
import Led from "./Led";
import AirConditioner from "./AirConditioner";

function App() {
  return (
    <div className="App">
      <h1>Simulation page for Silver Wave</h1>
      <Fan />
      <Bulb />
      <Led />
      <AirConditioner />
    </div>
  );
}

export default App;
