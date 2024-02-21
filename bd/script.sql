drop database if exists inventario;
CREATE DATABASE inventario;
USE inventario;
CREATE TABLE item(
    id varchar(5) not null primary key,
    nome varchar(50) not null,
    descricao text,
    valor decimal(10,2) not null
);
insert into item (id ,nome,descricao,valor)
VALUES
('i001','Mesa','Mesa de escritório',100.00),
('i002','Computador','Desktop DEL i5, 8GB RAM, SSD 500GB',2200.00),
('i003','Cadeira','Cadeira giratória de escritório',500.00),
('i004','Longarina','Longarina de três cadeiras',450.00),
('i005','Prateleira','Prateleira de vidro',2500.00),
('i006','Prateleira','Prateleira de Madeira',1600.00);

select * from item;