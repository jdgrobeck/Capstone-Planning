# Capstone-Planning

1. A package.json file or .txt file with the modules you intend to use (look at Checkpoint 1)
    - Use same package.json as Checkpoint 1
2. Use dotenv wiith secrets for your database connection
    - Get new JWT_SECRET key from https://passwords-generator.org/
2. DONE .gitignore file with node_modules and .env
4. Any assets you want to use (images, links, notes on folder structure, auth integration process, external APIs, etc.)

I'll be using React, so public and src folders will be made when I create the project for the front-end. Components will go inside src folder. This file setup is for the back-end.

To-do 4/6

1. DONE Make ERD
    - Fetching from API to show user their option. GET request to third-party API.
    - Send data to user
    - User makes selection. Data is mine to manipulate and use as I want once I retrieve it.
    - User's selection will be put in bet table. Will turn into post request.
2. Make sql file and tables in beekeeper
3. Figure out routes

    GET /users - Get all users from users table
    GET /users/:id - Get users by id
    GET /bets - Gets all of users' bets
    GET /bets/:user_id - Gets user's bets by their id
    POST /bets - Creates new bet in bets table
    POST /register - registers a new user
    DELETE /user - Removes user from users table
    DELETE /bet - Removes bet from bets table
    UPDATE /user - changes user information except for password
    UPDATE /bet - changes bet decision

    Create an endpoint that gets request from backend so API KEY isn't public.

To-do 4/8. Continuing on 4/10

1. Set up index.js
    - Do I need public on line 11?
2. DONE Set up users router and controller
    - Need to plan front-end with axios before doing bets router/controllers
3. DONE Set up db.js, aka what connects you to database

Is createUser different from register? Yes, I'll need to register users in the auth controller. Register and login routes are working. These put new users in the users table in Beekeeper. Is this ok?

Commented out bets routes and app.use bets on line 23 of index.js. Comment back in to affect bets table.


Able to connect, but having trouble with users routes. I believe this is because I haven't created the bets table yet and getAllUsers and getUsersById are linked to that table. 

However, I'm getting 404 codes for every route. the !id must be catching, but I'm using the correct routes on Postman and have checked usersRoutes. All the routes are correct.

Delete route is now working. I was missing the forward slash in /:id. UpdateUserById now works because I changed the sql from "fullName", which refers to the fullName function (why is it req.body.fullName and not req.body.full_name?) to full_name.

What if I want to update just the name, username, password or email? Can I just copy and change the body?

How do I get API data to front page and then save a user's pick to the bets table using Axios? Would this be done on the front end first?

I believe I have to GET the API data and display it the drop down menu. Once the data is displayed, I'll separate them by teams and give the user the option to pick either of them as a winner. 

I want to post the game_id (Could make it 201 for basketball, 301 for football, etc), user_id (which is a foreign key from the users table), communce_time coverted into standard time (MM/DD/YYY), sport (sport_key from API converted from basketball_nba to NBA basketball for example) and the team they choose (Either the home_team or away_team from API data. Could also probably pull it from displayed data -- a variable called awayTeam or homeTeam, which would be the away_team and home_team keys in the API, resepectively.)

Getting the data is working, now how do I display the average odds and spread from user's selection?# Bet-App-Backend
