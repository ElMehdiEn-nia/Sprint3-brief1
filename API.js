
export const creatures = [];

export const getData = async (limit, skip) => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${skip}`
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

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
                image: details.sprites.other["official-artwork"].front_default,
                description: `Pokemon ${details.name}`
            });
        }

        return data.results;

    } catch (error) {
        console.log("ERROR:", error);
        throw error;
    }
};
