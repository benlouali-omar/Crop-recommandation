
import * as React from 'react';
import "./result.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';





export default function Result({result}) {
    
  return (
      // <div className="div">
      //     <h4 className="resultDiv">The best Crop you can plant is : {result}</h4>
      // </div>
      <div className="resultDiv">
        
      <Card sx={{ maxWidth: 355 }} style={{ borderRadius:"13px"  }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {result.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        The best Crop you can plant is : {result}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt="green iguana"
        height="130"
        image={"../../../images/" +result+ ".jpg"}
      />
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>

    </div>
  );
}