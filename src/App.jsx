import './App.css';
import { useState } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { MapBox } from './components/mapview';
import { Sidedetails } from './components/sidedetails';
function App() {
  const [showdrawer, setShowdrawer] = useState(false);
  const closedrawer = () => {
    setShowdrawer(false);
  };
  return (
    <>
      <MapBox opendrawer={setShowdrawer} />
      <Sidedetails drawer={showdrawer} closedrawer={closedrawer} />
    </>
  );
}
export default App;
