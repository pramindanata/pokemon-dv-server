# [WIP] Pokemon - Data Visualization (Server)

This project contains API/Server side for **Pokemon - DV App**.

## Developments

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
