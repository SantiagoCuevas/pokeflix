import "./App.css";
import { ScrollList } from "./components/ScrollList/ScrollList";

function App() {
  const arr = [
    { title: "Jason" },
    { title: "Zac" },
    { title: "Bambi" },
    { title: "Kiki" },
    { title: "Dmi" },
    { title: "Jordan" },
  ];
  return (
    <>
      <ScrollList list={arr} circular={true} />
    </>
  );
}

export default App;
