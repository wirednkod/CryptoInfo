# CryptoInfo

### What's included:
- Server-side rendering, data fetching and client-side hydration (TypeScript supported)
- Dev server with hot reloading styles (nodemon)
- ESLinter (+ TS)

### Initial setup
    yarn run init
        Runs all needed commands to install server and client modules

### Scripts
    yarn start
      Builds and starts the server serving api and static files (production)

    yarn run dev
      Starts the server serving api and react files (hot reload)

    yarn run dev:server  
      Starts only the api server

    yarn run dev:client
      Starts only React

    yarn run build
      Builds the TS

    yarn run clean
      Removes build files