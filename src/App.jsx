import "./App.css";
import { useState, createContext, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { MapBox } from "./components/mapview";
import { Sidedetails } from "./components/sidedetails";
export const FlightState = createContext();
function App() {
  useEffect(() => {
    if (
      HTMLScriptElement.supports &&
      HTMLScriptElement.supports("speculationrules")
    ) {
      const speculationtag = document.createElement("script");
      speculationtag.type = "speculationrules";
      const speculationrules = {
        prerender: [
          {
            source: "list",
            urls: [
              "/src/components/mapview.jsx",
              "/src/components/sidedetails.jsx",
            ],
          },
        ],
      };
      speculationtag.textContent = JSON.stringify(speculationrules);
      document.body.appendChild(speculationtag);
    } else {
      console.log("speculationrules API is not supporting in your browser");
    }
  }, []);
  const [showdrawer, setShowdrawer] = useState(false);
  const closedrawer = () => {
    setShowdrawer(false);
  };
  const [flightcode, setFlightcode] = useState(() =>
    JSON.parse(window.localStorage.getItem("code"))
  );
  return (
    <FlightState.Provider
      value={{
        flightcode,
        setFlightcode,
      }}
    >
      <MapBox opendrawer={setShowdrawer} />
      <Sidedetails drawer={showdrawer} closedrawer={closedrawer} />
    </FlightState.Provider>
  );
}
export default App;
