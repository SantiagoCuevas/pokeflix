import "./reset.css";
import "./App.css";

import { PokePage } from "./components/PokePage/PokePage";
import { useWindowSize } from "./hooks/useWindowSize/useWindowSize";

function App() {
  const { width: windowWidth } = useWindowSize();

  if (windowWidth < 900) {
    return (
      <h1 className="mobile-disclaimer">
        This application is not meant for mobile devices. Please visit PokeFlix
        on a desktop or laptop device.
      </h1>
    );
  }

  return <PokePage />;
}

export default App;
