# Iban Check App

Monorepo which includes web and mobile apps for Montegero iban checking

## Prerequisites

For React Native environment setup please follow [steps in official documentation](https://reactnative.dev/docs/environment-setup)

## Installation and Setup

- Download or clone the repository
- Navigate to that repository direction
- Run `npm install` or `yarn install` (I prefer to use this one)

For **Android Platform** you need to 
- create `local.properties` file in `packages/mobile/android` directory root
- add there your `android sdk location` (something like this for mac users `sdk.dir=/Users/USERNAME/Library/Android/sdk`) 

For **iOS Platform** you need to do one more step
- Navigate to `packages/mobile/ios` directory
- Run `pod install`

In some reasons time by time metro bundler server maybe not to start, 
  so you can open new terminakl tab or window at the project directory and run
  `npm start` or `yarn start` command

After given steps you can run commands in root of monorepo:
`yarn web` for web app
`yarn ios` or `yarn android`, then `yarn start`,  for mobile app
## App Structure
```
    ├── packages                    
        ├── mobile
            ├──App.tsx
            ├──App.styles.ts
            ├──App.types.ts
        ├── web
            ├──src
               ├──App.tsx
        ├── shared
            ├──index.ts         
``` 

## Credits

List of contriubutors:
- [Karen Hakobyan](https://www.github.com/khakobyan)
