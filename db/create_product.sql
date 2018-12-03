insert into product
(product_name, company_name, company_url, product_img, votes, created_by)
values
($1, $2, $3, $4, 0, $5)
returning *;