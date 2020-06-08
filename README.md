# PokeDV - Server

This project contains API/Server side for **PokeDV App**. For the client side please look [here](https://github.com/pramindanata/pokemon-dv-client).

## Data Source

1. Base: [kaggle.com](https://www.kaggle.com/abcsds/pokemon)
2. Pokemon images: [portal-pokemon.com](https://id.portal-pokemon.com/play/pokede)
3. Pokemon descriptions: [pokemon.com](https://www.pokemon.com/us/pokedex)

## Prerequisite

1. Typescript: ^3.9.3
2. Node.js: ^12.16.0
3. PostgreSQL: 11

## Development

1. Run `npm install` to install all depedencies.
2. Create new `.env` file in this project root directory based from `.env.example`.
3. Fill `.env` values.
4. Create new DB and `npm run schema:sync` to synchronize DB tables.
5. Run these commands in same order to seed tables data:

    ```properties
    npm run seed:run -- -s CreatePokemons
    npm run seed:run -- -s CreateTypes
    npm run seed:run -- -s CreateStats
    npm run seed:run -- -s CreatePokemonToTypes
    ```

6. Run `npm run dev` to start development server.
7. Start developing :fire:.

For the client side, please download all Pokemon images from [here](https://bit.ly/2AqtL97). And then put them in `dist/public` folder (create new one if doesn't exist).

## Other

For [Insomnia](https://insomnia.rest/) user, you can import `insomnia/workspace.json` to your workspace for debugging this API.
