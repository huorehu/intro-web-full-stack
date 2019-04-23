create table messages
(
  id        int unsigned auto_increment
    primary key,
  messageid int          not null,
  message   char(255)    not null,
  userid    int unsigned not null,
  constraint messages_messageid_uindex
    unique (messageid)
);
