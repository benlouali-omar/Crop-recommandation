import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from '@mui/material/styles';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Link} from "react-router-dom";


const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];



export default function TopBar() {
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{textDecoration:"none",color:"white"}}>
            Crop recommandation System
          </Link>

          </Typography>

          <Link to="/aboutus" style={{textDecoration:"none",color:"white"}}>
          <Button color="inherit">About Us</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}