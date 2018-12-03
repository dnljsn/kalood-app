update product
set votes = votes + 1
where id = $1;

select *
from product
order by id;