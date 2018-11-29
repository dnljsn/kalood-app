insert into users
(email, hash, role)
values
($1, $2, 'Member')
returning *;