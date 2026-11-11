
export const creatures = [];

export const getData = async () => {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=20"
        );

        const data = await response.json();

        for (const pokemon of data.results) {

            const res = await fetch(pokemon.url);
            const details = await res.json();

            creatures.push({
                id: details.id,
                name: details.name,

                type: details.types[0].type.name,

                level: "base",

                stats: {
                    hp: details.stats[0].base_stat,
                    attack: details.stats[1].base_stat,
                    defence: details.stats[2].base_stat
                },

                image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(details.id).padStart(3, "0")}.png`,

                description: `Pokemon ${details.name}`
            });
        }

        console.log(creatures);

    } catch (error) {
        console.log("ERROR:", error);
    }
};

getData();
