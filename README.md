# fe-app-web

## About

This is a frontend application written in Vue 3 with Typescript and scaffolded with my pet project app called
[fe-app](https://github.com/rammedbro/fe-app.git)
that uses Vite for bundling and Express for serving.

It is also a polygon of some sort where I try different web technologies.
The file will include more content in the future.

## Project structure and architecture

The project uses FSD hence it has particular folder structure consisting of:

* app -
* assets - styles, images, fonts, etc.
* entities - variety of data object types used by application
* features - small pieces of business logic
* pages - web pages registered in router
* processes -
* shared - third party modules
* types - types (as name suggest)
* widgets -
* main.ts - application's entry point. It's a main file where we assemble and mount our app, listen to events, catch
  errors, etc.

## Noteworthy

* All tooling packages, like eslint, stylelint, lintstaged, etc., and its config files installed via 
[fe-app-codegen](https://github.com/rammedbro/fe-app/packages/codegen/) module.
* The fe-app package uses several config files for various purposes:
  * `fe-app.config.ts` - main setup file for bundling and serving
  * `client.config.ts` - client config handling file
  * `server.config.ts` - server response mocking file
  * `vite.config.ts` - vite setup file
