import Navbar from "./components/Navbar";
import "./App.css"
import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import axios from "axios";
import React, {useState, useEffect} from "react"
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const getAlerts = async () => {
    try{
      let response = await axios.get("https://anomaly-alert-backend.herokuapp.com/alert");

      toast.success('Successfully fetched alerts')
      setAlerts(response.data);
    }catch(error){
      toast.error('Error fetching alerts')
    }
  }

  useEffect(() => {
    getAlerts();
  }, [])


  useEffect(() => {
    console.log(selectedAlert)
  }, [selectedAlert])
  



  return (
    <div className="App" style={{width: '100%'}}>
      <Navbar />
      <Box display={'flex'} style={{backgroundColor: 'white', heigth: '400px', width: '100%'}}  flexDirection={'row'}>
        <Sidebar alerts={alerts} selectedAlert={selectedAlert} setSelectedAlert={setSelectedAlert} />
        {
          selectedAlert ? <Content selectedAlert={selectedAlert} setSelectedAlert={setSelectedAlert}/> : null
        }
      </Box>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
