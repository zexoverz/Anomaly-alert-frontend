import { Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState} from 'react'

function AlertCard({alert, selectedAlert, setSelectedAlert}) {

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const getDate = (date) => {
    let str = date.toString();
    return `${str.substring(0, 10)} ${str.substring(11, 19)}`;
  }

  let selectedStyle = () => {
    if(selectedAlert && selectedAlert._id === alert._id) {
      return 'blue'
    }else{
      return isHover ? 'blue' : "gray"
    }
  }

  let cardStyle = { minWidth: 300, margin: 1, borderStyle: "solid", borderColor: selectedStyle(), alignItems: "start", cursor: "pointer" }

  return (
    <Card sx={cardStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setSelectedAlert(alert)} >
      <CardContent>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID #{alert._id}
            </Typography>
            
            {alert.anomaly == "Mild" &&
            <Chip label="Mild" color="success"  />}

            {alert.anomaly == "Moderate" &&
            <Chip label="Moderate" color="warning" />}

            {alert.anomaly == "Severe" &&
            <Chip label="Severe" color="error"  />}
        </Box>
        <Box display={'flex'} flexDirection={'column'} mb={2}>
            <Typography variant="h6" component="div">
            Unknown Anomaly
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Detected at {getDate(alert.timestamp)}
            </Typography>
        </Box>

        <Typography variant="h8" color={"blue"}>
          {alert.machine}
        </Typography>

      </CardContent>
    </Card>
  )
}

export default AlertCard