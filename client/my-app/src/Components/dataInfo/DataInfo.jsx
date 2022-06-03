import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./dataInfo.css";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export default function DataInfo() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 460,
        bgcolor: 'snow',
        border: '2px solid #0530ad',
        boxShadow: 24,
        p: 4,
      };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="modalDiv">
      <center>
      <Button variant="outlined" size="small" onClick={handleOpen} style={{marginTop:"-9px",borderRadius:"14px"}}><InfoOutlinedIcon fontSize="small" className="infoIcon"></InfoOutlinedIcon>  About data</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            
          <Typography id="modal-modal-title" variant="h6" component="h2"  >
            About the data
          </Typography>
         
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            
<h5>Data fields</h5> <br />
N -  ratio of Nitrogen content in soil - kg/ha <br />
P -  ratio of Phosphorous content in soil - kg/ha <br />
K -  ratio of Potassium content in soil - kg/ha <br />
Temperature -  temperature in degree Celsius <br />
Humidity -  relative humidity in % <br />
ph -  ph value of the soil <br />
Rainfall -  rainfall in mm <br />
          </Typography>
        </Box>
      </Modal>
      </center>
    </div>
  );
}
