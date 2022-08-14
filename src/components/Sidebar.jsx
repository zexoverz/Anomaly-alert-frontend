import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import AlertCard from './AlertCard'

function Sidebar({alerts, selectedAlert, setSelectedAlert}) {

  return (
    <Box display={'flex'} flexDirection={'column'}  m={3} sx={{ width: '20%'}}>
      {alerts?.map(alert => <AlertCard alert={alert} selectedAlert={selectedAlert} setSelectedAlert = {setSelectedAlert} key={alert._id }/>)}
    </Box>
  )
}

export default Sidebar