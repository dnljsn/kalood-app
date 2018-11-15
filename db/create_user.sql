insert into users
(user_email, user_hash, role)
values
($1, $2, 'Member')
returning *;