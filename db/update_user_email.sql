update users
set email = $1
where id = $2
returning *;