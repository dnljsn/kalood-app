update users
set user_email = $1
where id = $2
returning *;