create table product (
    id serial primary key,
    product_name varChar(100),
    company_name varChar(100),
    company_url varChar(100),
    product_img text,
    votes integer,
    created_by integer references users (id)
)