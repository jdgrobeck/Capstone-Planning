 CREATE TABLE users (
   id int primary key auto_increment,
   full_name varchar(100) not null,
   username varchar(50) not null unique,
   password_hash varchar(1000) not null,
   email varchar(100) not null unique
)