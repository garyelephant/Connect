
--ʱ���ֶ�--
create table filesynclist(
    path text primary key not null,          --�ļ�·��--
    nodetype integer not null,   --�ڵ����ͣ�ֵ��0 [�ļ�] 1 [Ŀ¼]--
    synctype integer not null
    --ͬ�����ͣ�ֵ��0 [�����ļ�����(����)���ƶ�] 1 [�ƶ��ļ�����(����)������]
                    --2 [ɾ���ƶ��ļ�] 3 [ɾ�������ļ�] --
);

create table synchistory(
    id integer primary key autoincrement not null,
    dir text not null,          --�ļ�·�����������ļ���--
    filename text not null,   --�ļ���--
    resultid integer not null references syncresult(resultid)--ͬ�����--
);

create table syncresult(
    resultid integer primary key autoincrement not null,
    description text not null
);
