import { useState } from "react";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

function App() {
  const [showHome, setShowHome] = useState(false);

  return (
    <div className="app-container">
      {showHome ? <Home /> : <Landing setShowHome={setShowHome} />}
    </div>
  );
}

export default App;
