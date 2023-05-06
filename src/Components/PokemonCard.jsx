import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// import PokemonWeakness from "./PokemonWeakness";
import {usePokemonWeakness} from "../Hooks/usePokemonWeakness"

let i = 0;

export default function PokemonCard({ name, img, typesArr }) {
	const type = typesArr.map((item) => {
		const classes = `type ${item}`;
		return (
			<span key={i++} className={classes}>
				{item}
			</span>
		);
	});

	const { weaknesses, isLoading, error } = usePokemonWeakness( name );

	const typeWeakTo = weaknesses.map((item) => {
		const classes = `type ${item}`;
		return (
			<span key={i++} className={classes}>
				{item}
			</span>
		);
	});

	return (
		<Card sx={{ maxWidth: 350 }}>
			<CardMedia sx={{ height: 200 }} image={img} title={name} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					<div className="name">
						<b>{name}</b> <span className="types">{type}</span>
					</div>
					{/* {console.log({weaknesses})} */}
					<div>Weak to: <span className="types">{typeWeakTo}</span>
        
					</div>
				</Typography>
			</CardContent>
		</Card>
	);
}
