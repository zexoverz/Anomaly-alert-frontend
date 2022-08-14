import React, {useState} from 'react'
import {Box, Tab, Tabs, Typography} from "@mui/material"
import {SettingsOutlined, PersonOutline, NotificationsOutlined} from "@mui/icons-material"
import logo from "../logo.png"

function Navbar() {
    const [value, setValue] = useState('2');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Box display={'flex'} style={{backgroundColor: 'white',}}  flexDirection={'row'} justifyContent={'space-between'} p={2} >
        <Box display={'flex'} flexDirection={'row'} >
            <img src={logo} alt="logo" style={{width: '200px', marginRight: '40px'}}/>
            <Tabs value={value} onChange={handleChange} >
                <Tab label="Dashboard" value="1" disabled/>
                <Tab label="Alerts"  value="2" />
            </Tabs>
        </Box>

        <Box display={'flex'} flexDirection={'row'} > 
            <SettingsOutlined sx={{height: 60, width: 30, color: 'blue', marginRight: 3}}/>
            <PersonOutline sx={{height: 60, width: 30, color: 'blue', marginRight: 3}}/>
            <NotificationsOutlined sx={{height: 60, width: 30, color: 'blue', marginRight: 3}}/>
            <Typography variant="h6" sx={{marginTop: 2}}>Welcome Admin ! </Typography>
        </Box>
    </Box>
  )
}

export default Navbar