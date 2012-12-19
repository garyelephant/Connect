
--时间字段--
create table filesynclist(
    path text primary key not null,          --文件路径--
    nodetype integer not null,   --节点类型，值：0 [文件] 1 [目录]--
    synctype integer not null
    --同步类型，值：0 [本地文件更新(新增)至云端] 1 [云端文件更新(新增)至本地]
                    --2 [删除云端文件] 3 [删除本地文件] --
);

create table synchistory(
    id integer primary key autoincrement not null,
    dir text not null,          --文件路径，不包括文件名--
    filename text not null,   --文件名--
    resultid integer not null references syncresult(resultid)--同步结果--
);

create table syncresult(
    resultid integer primary key autoincrement not null,
    description text not null
);
