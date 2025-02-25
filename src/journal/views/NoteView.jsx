import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import 'sweetalert2/dist/sweetalert2.css';
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSavingNotes, startUploadingFiles } from "../../store/journal/thunks"
import Swal from "sweetalert2"


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving} = useSelector( state => state.journal);
    const {body, title, onInputChange, formState, date} = useForm(note)
    const dateString = useMemo(()=>{
        const newDate = new Date( date );

        return newDate.toUTCString();

    },[date])

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch( setActiveNote(formState));
    
      
    }, [formState])

    useEffect(() => {
        
      if(messageSaved.length > 0){
        console.log(messageSaved)
        Swal.fire('Nota actualizada',messageSaved, 'success' );
      }
    
      
    }, [messageSaved])
    

    const onSaveNote = () =>{
        dispatch(startSavingNotes());
        
    }

    const onDelete = () =>{
      dispatch(startDeletingNote())
    }

    const onFileInputChange = ({target}) =>{
      if(target.files === 0) return;
      dispatch( startUploadingFiles(target.files));
    }
    
    return (
     
    <>
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{mb: 1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight='ligth'>{dateString}</Typography>
        </Grid>
        <Grid item>
            <input type="file" 
            multiple
            ref={fileInputRef}
            onChange={onFileInputChange}
            style={{display:'none'}}
            />
            <IconButton 
            color="primary"
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
            >
                <UploadOutlined/>
            </IconButton>
            <Button color="primary" sx={{padding:2}} onClick={ onSaveNote } disabled={isSaving}>
                <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField 
            type="text" 
            variant="filled" 
            fullWidth placeholder="Ingresa un titulo" 
            label='Titulo' sx={{border:'none', mb:1}}
            name="title"
            value={title}
            onChange={onInputChange}
            />
            <TextField 
            type="text" 
            variant="filled" 
            multiline 
            fullWidth 
            placeholder="¿Qué sucedio en el dia de hoy?" 
            minRows={5}
            name="body"
            value={body}
            onChange={onInputChange}
            />
        </Grid>

        <Grid container justifyContent='end'>
          <Button
          onClick={onDelete}
          sx={{mt:2}}
          color="error"
          >
            <DeleteOutline/>
            Borrar
          </Button>

        </Grid>

        {/* Image gallery */}
        <ImageGallery images={note.imageUrls}/>


    </Grid>
    </>
  )
}
