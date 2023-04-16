-- Game_id, commence_time, sport and pick will come directly from API. How do I get those into this table?

CREATE TABLE bets (
   id int primary key auto_increment,
   user_id varchar(100) not null,
   game_id varchar(50) not null unique,
   commence_time varchar(1000) not null,
   sport varchar(100) not null.
   pick varchar(100) not null
) 