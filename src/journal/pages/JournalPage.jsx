import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../views'
import { NoteView } from '../views/NoteView'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'

export const JournalPage = () => {

  const dispatch = useDispatch();
  const {isSaving, active} = useSelector( state => state.journal);


  const onClickNewNote = () =>{
    dispatch( startNewNote());
   
  }
  return (
    <JournalLayout>
      {/* <Typography>Quis enim sint duis eu. Non officia mollit elit in do eiusmod irure Lorem in incididunt. Dolor reprehenderit cillum reprehenderit et occaecat elit deserunt exercitation est amet.</Typography> */}
    
       
       {
        (!!active) ? <NoteView/> : <NothingSelectedView/>
       }
       {/* NoteView */}
       {/* <NoteView/> */}
       <IconButton
       onClick={onClickNewNote}
       size='large'
       sx={{

        color:'white',
        backgroundColor:'error.main',
        ':hover':{backgroundColor:'error.main', opacity: 0.9},
        position: 'fixed',
        right: 50,
        bottom: 50
       }}
       disabled={isSaving}

       >
        <AddOutlined sx={{fontSize:30}}/>

       </IconButton>
    
    </JournalLayout>
   
  )
}
