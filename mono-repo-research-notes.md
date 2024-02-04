# Learning about mono repos

Goal: As a part of the `Setup of Mono repo` step in `planning.md` we are research and initializing a mono repo soltion

## [Firebase video notes](https://www.youtube.com/watch?v=9iU_IE6vnJ8)
* most basic approach is workspaces from your pacakge manager
    * This would effectively just share versions and commands between projects
* Lerna is a good alternative for a multi package repo
* Replace npm with pnpm for a fast package manager
* But what about rebuilding?
    * Enter smart build systems like Turbo and Nx
    * Cache artifacts alread built
    * Nx vs Turbo reo
        * NX has been around longer
        * Turn repo in more minimal
        * NX also has a vscode extension and CLI for boilerplate generation
        * Turbo repo is written in Go, but Nx might end up being faster

## [Firebase Nx tutorial](https://www.youtube.com/watch?v=VUyBY72mwrQ&t=6s)
* `npmx create nx workspace <name>` (Setup boilerplate code)
* Dirs created:
    * `apps/` => Any standalone applications
    * `libs/` => Shared code like component, types, config, etc
* Nx vs code extension gives a way to find all available commands in the projects
* (not super Nx exclusive)
    * There are tools that allow you to only run the pipelines for effected applications and their dependencies, this is great as it can save you a lot of time with e2e tests.
* the nx cli (Which might be the angular cli) can generate the boilerplate for our apps
## NX research
* Nx provides a migration system that works like database migration scripts, but for your config packages, npm, and even source code
* Ships with plguins for all major build tools, frameworks and test runners.  Even supports Docker
* Has story book support

## How would I X in ... Y

## Possible options with pro/cons


## Choosing what to go with and why I made that choice

## Following a hello world for something

## General Questions
- [x] How is lerna different from Nx, do they solve different problems?
    * Answer: Lerna is really just good for controlling dependnecies shared between a set of applications.  It struggles once you have to scale that environment to support building and automatic testing
- [ ] How is Nest and Next.js best handled in a lerna mono repo or Nx?