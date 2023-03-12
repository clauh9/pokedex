import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

let i = 0;

export default function PokemonCard({name, img, typesArr}) {
    const type = typesArr.map(item => {
        const classes = `type ${item}`;
        return <span key={i++} className={classes}>{item}</span>
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
      </CardContent>
    </Card>
  );
}