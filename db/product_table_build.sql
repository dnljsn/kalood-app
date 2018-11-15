create table product (
    id serial primary key,
    company varChar(100),
    img_1 text,
    img_2 text,
    img_3 text,
    img_4 text,
    img_5 text,
    reached_goal boolean,
    status text,
    verified boolean,
    created_date timestamp,
    votes integer,
    votes_needed integer,
    created_by integer references users (id),
    company_URL varChar(100)
)