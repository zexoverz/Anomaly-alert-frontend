import { Box, InputLabel, TextField, Typography, MenuItem, TextareaAutosize, Button } from '@mui/material'
import React, {useEffect, useRef} from 'react'
import { useState } from 'react'
import firebaseApp from '../firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';



function Content({selectedAlert, setSelectedAlert}) {

  const storage = getStorage(firebaseApp);
  const [file, setFile] = useState(null)

  let cncReason = [
    {
      value: 'Spindle Error',
      label: 'Spindle Error',
    },
    {
      value: 'Axis Problem',
      label: 'Axis Problem',
    },
    {
      value: 'Normal',
      label: 'Normal',
    },
  ]

  let millingReason = [
    {
      value: 'Machine Crash',
      label: 'Machine Crash',
    },
    {
      value: 'Router Fault',
      label: 'Router Fault',
    },
    {
      value: 'Normal',
      label: 'Normal',
    },
  ]

  let actions = [
    {
      value: 'Immediate',
      label: 'Immediate',
    },
    {
      value: 'Later',
      label: 'Later',
    },
    {
      value: 'No Action',
      label: 'No Action',
    },
  ]

  useEffect(() => {
    getWaveFile()
  }, [])

  const getWaveFile = async () => {
    try{
      let soundRef = ref(storage, `${'gs://anomaly-alert.appspot.com'}/${selectedAlert.soundclip}`)
      let data = await getDownloadURL(soundRef)

      setFile(data);
    }catch(error){
      console.log(error)
    }
  }

  const updateAlert = async () => {
    let updateAlert = {
      timestamp : selectedAlert.timestamp,
      machine : selectedAlert.machine,
      anomaly : selectedAlert.anomaly,
      sensor : selectedAlert.sensor,
      soundclip : selectedAlert.soundclip,
      reason : selectedAlert.reason,
      action : selectedAlert.action,
      comment : selectedAlert.comment,
    }

    try{
      let response = await axios.put(`https://anomaly-alert-backend.herokuapp.com/alert/${selectedAlert._id}`, updateAlert)

      if(response.status == 200){
        toast.success('Successfully updated alerts')
        setSelectedAlert(response.data)
      }
    }catch(error){
      toast.error('Error updated alerts')
    }
  }

  const getDate = (date) => {
    let str = date.toString();
    return `${str.substring(0, 10)} ${str.substring(11, 19)}`;
  }
  

  return (
    <Box display={'flex'} flexDirection={'column'} p={1} m={3} sx={{width: '80%',}}>
      <Box display={'flex'} flexDirection={'column'} mb={3}>
        <Typography variant="h5" sx={{marginTop: 2}}>
          Alert ID #{selectedAlert._id}
        </Typography>
        <Typography sx={{ fontSize: 18, marginBottom: 5}} color="text.secondary" gutterBottom>
          Detected at {getDate(selectedAlert.timestamp)}
        </Typography>

        <Typography sx={{ fontSize: 18 }}>Anomaly Machine Output</Typography>
        <p>{selectedAlert.soundclip}</p>
        {
          file &&
          <ReactAudioPlayer
            src={file}
            controls

          />
        }
      </Box>

      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
        <Box mb={3}>
          <Typography sx={{ fontSize: 18 }}>Equipment</Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {selectedAlert.machine}
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography sx={{ fontSize: 18 }}>Suspected Reason</Typography>
          <TextField
            select
            value={selectedAlert.reason}
            onChange={(e) => setSelectedAlert({...selectedAlert, reason: e.target.value})}
            sx={{width: '200px'}}
          >
            {selectedAlert.machine == "CNC Machine" ? cncReason.map(reason => <MenuItem key={reason.value} 
            value={reason.value}>{reason.label}</MenuItem>) : 
            millingReason.map(reason => <MenuItem key={reason.value} value={reason.value}>{reason.label}</MenuItem>)}
          </TextField>
        </Box>

        <Box mb={3}>
        <Typography sx={{ fontSize: 18 }}>Action Required</Typography>
        <TextField
          select
          value={selectedAlert.action}
          onChange={(e) => setSelectedAlert({...selectedAlert, action: e.target.value})}
          sx={{width: '200px'}}
        >
          {actions.map(action => <MenuItem key={action.value} value={action.value}>{action.label}</MenuItem>)}
        </TextField>
        </Box>

        <Box mb={3}>
          <Typography sx={{ fontSize: 18 }}>Comments</Typography>
          <TextareaAutosize minRows={7} style={{ width: 800 }} value={selectedAlert.comment} onChange={(e) => setSelectedAlert({...selectedAlert, comment: e.target.value})}>
          </TextareaAutosize>
        </Box>

        <Button color='primary' variant='contained' sx={{width: 120}} onClick={updateAlert}>Update</Button>
        
      </Box>
    </Box>
    
  )
}

export default Content