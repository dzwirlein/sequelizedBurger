create database burgers_db;

use database burgers_db;

create table burgers (

    id int auto_increment not null,
    burger_name VARCHAR (50) not null,
    devoured boolean default false,
    primary key (id)
);