update product
set votes = votes + 1
where id = $1
returning *;