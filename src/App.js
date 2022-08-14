import Navbar from "./components/Navbar";
import "./App.css"
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div display={'flex'} style={{backgroundColor: 'white', heigth: '400px', width: '300px'}}  flexDirection={'row'}>
      </div>
    </div>
  );
}

export default App;
