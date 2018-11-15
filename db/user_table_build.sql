create table users (
    id serial primary key,
    user_email varChar(100),
    user_hash text,
    first_name varChar(100),
    last_name varChar(100),
    profile_pic text,
    role text
)