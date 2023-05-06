import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import pokemon_loading from '../Img/pokemon_loading.gif';
import {usePokemonWeakness} from "../Hooks/usePokemonWeakness"

let i = 0;

function typesColors(array) {
	const newArray = array.map((item) => {
		const classes = `type ${item}`;
		return (
			<span key={i++} className={classes}>
				{item}
			</span>
		);
	});

	return newArray;
}


export default function PokemonCard({ name, img, typesArr }) {
	const { weaknesses, isLoading, error } = usePokemonWeakness( name );

	//set the colors for that pokemon type
	const type = typesColors(typesArr);
    //set the colors for that pokemon weaknesses
	const typeWeakTo = typesColors(weaknesses);

	return (
		<Card sx={{ maxWidth: 350 }}>
			<CardMedia sx={{ height: 200 }} image={img} title={name} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					<div className="name">
						<b>{name}</b> <span className="types">{type}</span>
					</div>
					{/* {console.log({weaknesses})} */}
					<div>Weak to: {isLoading? <img src={pokemon_loading} alt="" width="50" height="35"/>: <span className="types">{typeWeakTo}</span> }
        
					</div>
				</Typography>
			</CardContent>
		</Card>
	);
}
