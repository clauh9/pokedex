import * as React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PokemonCard({name, img, typesArr}) {
    const type = typesArr.map(item => {
        const classes = `type ${item}`;
        return <span className={classes}>{item}</span>
      });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={img}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <div className='name'><b>{name}</b></div>
          <div className="types">{type}</div>
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}