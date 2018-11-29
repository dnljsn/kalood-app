update users
set user_img = $1
where id = $2
returning *;