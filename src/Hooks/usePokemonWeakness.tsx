import { useState, useEffect } from "react";

export function usePokemonWeakness(pokemonName: string) {
	const [weaknesses, setWeaknesses] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | undefined>();

	useEffect(() => {
		const fetchWeaknesses = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
				);
				const data = await response.json();

				// Get all the types of the pokemon
				const types = data.types.map((type: any) => type.type.name);

				const multipliers: { [type: string]: number } = {};
				for (const type of types) {
					const typeResponse = await fetch(
						`https://pokeapi.co/api/v2/type/${type}`
					);
					const typeData = await typeResponse.json();

					for (const damageRelation of typeData.damage_relations
						.double_damage_from) {
						multipliers[damageRelation.name] =
							(multipliers[damageRelation.name] || 1) * 2;
					}
					for (const damageRelation of typeData.damage_relations
						.half_damage_from) {
						multipliers[damageRelation.name] =
							(multipliers[damageRelation.name] || 1) * 0.5;
					}
					for (const damageRelation of typeData.damage_relations
						.no_damage_from) {
						multipliers[damageRelation.name] = 0;
					}
				}

				// const weaknesses: string[] = [];
				// for (const [type, multiplier] of Object.entries(multipliers)) {
				// 	if (multiplier > 1) {
				// 		weaknesses.push(type);
				// 	}
				// }

				//order weaknesses from most effective to least
				const weaknesses: string[] = Object.entries(multipliers)
					.filter(([type, multiplier]) => multiplier > 1)
					.sort((a, b) => b[1] - a[1])
					.map(([type, _]) => type);

				setWeaknesses(weaknesses);
			} catch (error) {
				setError(error as Error);
			}
			setIsLoading(false);
		};

		if (pokemonName) {
			fetchWeaknesses();
		}
	}, [pokemonName]);

	return { weaknesses, isLoading, error };
}
