update users
set profile_pic = $1
where id = $2
returning *;