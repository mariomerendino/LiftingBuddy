# Lifting buddy

## Mobile Setup:

- install expo-cli globally
  - `npm install --global expo-cli`
- `cd mobile`
- `npm i`
- `npm start`
  - Press `i` to start iOS app & simulator
    - if the simulator doesn't launch & you get an error try running `open -a Simulator` to manually launch an iOS simulator & try again.
  - Press `a` to start the Android App.

## Server Setup

- Ensure you have the correct version of ruby installed, check the .ruby-version file (use rbenv to switch between ruby versions)
- ensure you have Postgres installed
- run `cd server`
- run `bundle` to install all dependencies
- run `rails db:create` to create the database.
- run `rails db:migrate` to run all migrations.

## Running instructions
- run `chmod 777 startup` to make the file executable
- run `./startup`
- This will spin up two terminals, one for the Mobile app, one for the rails server. 