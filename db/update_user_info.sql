update users
set first_name = $1, last_name = $2
where id = $3
returning *;