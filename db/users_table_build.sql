create table users (
    id serial primary key,
    email varChar(100),
    hash text,
    first_name varChar(100),
    last_name varChar(100),
    user_img text,
    role text
)