async function fetcher(...args) {
  const response = await fetch(...args);
  return response.json();
}

export default async function fetchPokemon() {
  const data = await fetcher("https://pokeapi.co/api/v2/pokemon?limit=151");
  const promises = data.results.map((pokemon) => fetcher(pokemon.url));
  const pokemon = await Promise.all(promises);
  return pokemon.map((p) => ({ ...p, is_in_party: false }));
}
