create table users
(
  id         int unsigned auto_increment
    primary key,
  name       char(50)                            not null,
  password   char(70)                            not null,
  created_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
  constraint users_name_uindex
    unique (name)
);
