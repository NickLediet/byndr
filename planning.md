# Planning

MISSION/VP: 
* Providing collection managment tools and data insights for many card games. 
* Secondary goal of serving as a financial history source by aggregating many different price sources for many different TCGs like if they were a security

## Setup of Mono repo
- [ ] Watch some intro to lerna or nix videos (any mono repo tool)
- [ ] Setup a lerna hello world with the following packages/app
    - [ ] a package (in TypeScript) that provides data
    - [ ] an app ideally in TypeScript, that consumes the data
- [ ] Migrate the `tcg-collection-tools` repo into a mono repo in this project (collection-service)
- [ ] Migrate the `tcg-collection-tools-frontend` repo into this mono repo (frontend)
- [ ] Add unit tests
- [ ] Archive those projects from GitHub (after merging feature)

## Add collection feature
- [ ] User Feature
    - [ ] Add Login/Logout to frontend, solution may be third party
    - [ ] Using the auth solution, create a frontend where the user may
        - [ ] Login
        - [ ] Logout
        - [ ] See a very basic dashboard
    - [ ] Create User Model in the Collection Service with...
        - [ ] id (PK)
        - [ ] first_name (varchar)
        - [ ] last_name (varchar)
        - [ ] email (varchar)
        * note: this might end up being an almost empty model. Auth solution might handle all of this
    - [ ] Map the auth solution User Model

## Collection Feature

USER STORY: As a user, I want to create a list of cards that may be included in my total collection or excluded to be used as I chose (example: tracking a cards price (watchlists), possible buy lists, to later be turned into a transaction)

REQUIREMENTS:
    * All Features can be performed via the Web UI or CLI
    * Create new lists
    * Delete lists
    * View all my lists
    * Can import a CSV list from a TCG Player `.csv` export file
        * __Note: this will late be a part of the Transaction feature, but for now it provides a way to seed my personal collection as I'm building__
    * (BL) Manually build an import (i.e. search card and build a transaction)
    * (BL) Provide a UX to customize cards in a list (misprints, oddities, signed, graded, etc)
    * (BL) Provide custom images for cards with notes
    * (BL) Provide multiple cardgame sources
    * (BL) Feature Wishlist
        * Notification System
        * Provide a ebay search query for noteworthy cards, to track their history

- [ ] Create list model with...
    - [ ] id (PK)
    - [ ] user_id (FK)
    - [ ] in_collection (bool)
    - [ ] name (varchar)
    - [ ] description (text/markdown)
- [ ] Create list card model with...
    - [ ] id (PK)
    - [ ] list_id (FK)
    - [ ] notes (longtext/markdown)
    - [ ] scryfall_id
- [ ] Create a cards 
