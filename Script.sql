
drop database libros;
create database libros;
use libros;
create table usuarios(
	id int primary key auto_increment unique,
    email varchar(500),
    nombre varchar(100),
    pwd varchar(200),
    rol varchar(50),
    visitas bigint,
    unique(email)
);
create table libro(
	id int primary key auto_increment unique,
    nombre varchar(100),
	autor varchar(100),
    portada varchar(500)

);

create table libro_por_usuario(
	id int primary key auto_increment unique,
    id_libro bigint,
	id_usuario bigint

);

insert into libro (nombre, autor, portada) values ("alas de hierro", "rebecca yarros","https://imagessl0.casadellibro.com/a/l/s5/50/9788408284550.webp");
insert into libro (nombre, autor, portada) values ("CASA DE LLAMA Y SOMBRA (CIUDAD MEDIALUNA 3)","SARAH J. MAAS","https://imagessl0.casadellibro.com/a/l/s5/70/9788419507570.webp");
insert into libro (nombre, autor, portada) values ("LA SOCIEDAD DE LA NIEVE","PABLO VIERCI","https://imagessl2.casadellibro.com/a/l/s5/32/9788418584732.webp");
insert into libro_por_usuario(id_libro,id_usuario) values(2,2);

insert into usuarios (email, nombre, pwd, rol) values ("davidbarriuso01@gmail.com","David", "david","admin");

select * from libro_por_usuario;
select * from usuarios;
select * from libro;