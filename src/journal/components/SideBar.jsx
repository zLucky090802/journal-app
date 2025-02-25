import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'

export const SideBar = ({drawerWidth = 240}) => {
  const [name, setName] = useState("");
  const {displayName} = useSelector( state => state.auth);
  const {notes} = useSelector( state => state.journal);
 
  useEffect(() => {
    if (displayName) {
      setName(displayName);
    }
  }, [displayName]);
  
 
  return (
    <Box
    component='nav'
    sx={{width: {sm: drawerWidth}, flexShrink:{sm:0}}}
    >
      <Drawer
       variant='permanent'
       open={true}
       sx={{
        display: {xs:'block'},
        '& .MuiDrawer-paper':{boxSizing: 'border-box', width:drawerWidth}
       }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>{name} </Typography>
        </Toolbar>
        <Divider/>

        <List>
          {
            notes.map(note =>(
              <SideBarItem
               {...note} 
               key={note.id} 
               
              />
            )

            )
          }
        </List>

      </Drawer>

    </Box>
  )
}
