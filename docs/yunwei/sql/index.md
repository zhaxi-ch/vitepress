## 日常排查数据库的命令 -Sql server 篇

### 常用命令
``` SQL
-- 逻辑读写合计排名前十

SELECT TOP 10
        (total_logical_reads / execution_count) AS avg_logical_reads
       ,(total_logical_writes / execution_count) AS avg_logical_writes
       ,(total_physical_reads / execution_count) AS avg_phys_reads
       ,execution_count
       ,(SELECT SUBSTRING(text,statement_start_offset / 2 + 1,
                          (CASE WHEN statement_end_offset=-1
                                THEN LEN(CONVERT(NVARCHAR(MAX),text)) * 2
                                ELSE statement_end_offset
                           END - statement_start_offset) / 2)
         FROM   sys.dm_exec_sql_text(sql_handle)) AS query_text
       --,plan_handle
	   ,db_name(qp.dbid)
	   ,qp.query_plan
FROM    sys.dm_exec_query_stats
cross apply sys.dm_exec_query_plan(plan_handle) qp
ORDER BY (total_logical_reads + total_logical_writes)/execution_count DESC



SELECT TOP 100
        (total_logical_reads / execution_count) AS avg_logical_reads
       ,(total_logical_writes / execution_count) AS avg_logical_writes
       ,(total_physical_reads / execution_count) AS avg_phys_reads
       ,execution_count
       ,(SELECT SUBSTRING(text,statement_start_offset / 2 + 1,
                          (CASE WHEN statement_end_offset=-1
                                THEN LEN(CONVERT(NVARCHAR(MAX),text)) * 2
                                ELSE statement_end_offset
                           END - statement_start_offset) / 2)
         FROM   sys.dm_exec_sql_text(sql_handle)) AS query_text
       ,plan_handle
	   ,db_name(qp.dbid)
	   ,qp.query_plan
FROM    sys.dm_exec_query_stats
cross apply sys.dm_exec_query_plan(plan_handle) qp
ORDER BY (total_logical_reads )/execution_count DESC



--执行次数最多的查询计划
SELECT TOP 50
    creation_time
   ,last_execution_time
   ,execution_count
   ,(total_logical_reads/execution_count) AS avg_logical_reads
   ,(total_logical_writes/execution_count) AS avg_logical_writes
   ,(total_physical_reads/execution_count) AS avg_phys_reads
   ,SUBSTRING(st.text,(qs.statement_start_offset/2)+1,
              ((CASE statement_end_offset
                  WHEN -1 THEN DATALENGTH(st.text)
                  ELSE qs.statement_end_offset
                END-qs.statement_start_offset)/2)+1) AS statement_text
   ,DB_NAME(qp.dbid)
   ,qp.query_plan
FROM
    sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_query_plan(plan_handle) qp
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
WHERE (total_logical_reads/execution_count) > 100
ORDER BY
    execution_count DESC
	
	
 
--总计耗费CPU时间最长的查询计划
SELECT TOP 50
    creation_time
   ,last_execution_time
   ,execution_count
        ,total_worker_time
       ,last_worker_time
       ,max_worker_time
       ,min_worker_time
       ,SUBSTRING(st.text,(qs.statement_start_offset / 2) + 1,
                  ((CASE statement_end_offset
                      WHEN -1 THEN DATALENGTH(st.text)
                      ELSE qs.statement_end_offset
                    END - qs.statement_start_offset) / 2) + 1) AS statement_text
					   ,qp.query_plan
FROM    sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_query_plan(plan_handle) qp
CROSS   APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
ORDER BY total_worker_time DESC
``` 
### 查询重复的INDEX
``` SQL

--duplicated index for one database

WITH    indexcols
          AS (
              SELECT
                object_id AS id
               ,index_id AS indid
               ,name
               ,(
                 SELECT
                    CASE keyno
                      WHEN 0 THEN NULL
                      ELSE colid
                    END AS [data()]
                 FROM
                    sys.sysindexkeys AS k
                 WHERE
                    k.id=i.object_id AND k.indid=i.index_id
                 ORDER BY
                    keyno
                   ,colid
                FOR
                 XML PATH('')
                ) AS cols
               ,(
                 SELECT
                    CASE keyno
                      WHEN 0 THEN colid
                      ELSE NULL
                    END AS [data()]
                 FROM
                    sys.sysindexkeys AS k
                 WHERE
                    k.id=i.object_id AND k.indid=i.index_id
                 ORDER BY
                    colid
                FOR
                 XML PATH('')
                ) AS inc
              FROM
                sys.indexes AS i
             )
    SELECT
        OBJECT_SCHEMA_NAME(c1.id)+'.'+OBJECT_NAME(c1.id) AS 'table'
       ,c1.name AS 'index'
       ,c2.name AS 'exactduplicate'
    FROM
        indexcols AS c1
    JOIN 
        indexcols AS c2
        ON c1.id=c2.id AND c1.indid<c2.indid AND c1.cols=c2.cols AND c1.inc=c2.inc;
		
--------------------------------------------------------------------------------------
--duplicate index in every database
--------------------------------------------------------------------------------------


DROP TABLE #temp
GO

CREATE TABLE #temp
(database_name sysname,
table_name sysname,
index_name sysname,
duplicate_index_name sysname)

EXEC sp_MSforeachdb @command1='use [?];
if db_name() not in (''master'',''tempdb'',''msdb'',''model'')
begin
WITH    indexcols
          AS (
              SELECT
                object_id AS id
               ,index_id AS indid
               ,name
               ,(
                 SELECT
                    CASE keyno
                      WHEN 0 THEN NULL
                      ELSE colid
                    END AS [data()]
                 FROM
                    sys.sysindexkeys AS k
                 WHERE
                    k.id=i.object_id AND k.indid=i.index_id
                 ORDER BY
                    keyno
                   ,colid
                FOR
                 XML PATH('''')
                ) AS cols
               ,(
                 SELECT
                    CASE keyno
                      WHEN 0 THEN colid
                      ELSE NULL
                    END AS [data()]
                 FROM
                    sys.sysindexkeys AS k
                 WHERE
                    k.id=i.object_id AND k.indid=i.index_id
                 ORDER BY
                    colid
                FOR
                 XML PATH('''')
                ) AS inc
              FROM
                sys.indexes AS i
             )
    insert into #temp
	SELECT
       DB_name()
	   ,OBJECT_SCHEMA_NAME(c1.id)+''.''+OBJECT_NAME(c1.id) AS ''table''
       ,c1.name AS ''index''
       ,c2.name AS ''exactduplicate''
    FROM
        indexcols AS c1
    JOIN 
        indexcols AS c2
        ON c1.id=c2.id AND c1.indid<c2.indid AND c1.cols=c2.cols AND c1.inc=c2.inc
end'

SELECT * FROM #temp 
```

## 检查没有索引的表
``` SQL
--for all user database

CREATE TABLE #temp
(
    [database_name] sysname
  , [schema_name] sysname
  , Table_name sysname
  , [object_id] BIGINT
  , Approximate_Rows BIGINT
  , Column_Count BIGINT
);


EXEC sp_MSforeachdb @command1 = 'use [?];
if db_name() not in (''master'',''tempdb'',''msdb'',''model'')

begin
  insert into #temp 
  
SELECT DISTINCT
       db_name() AS [Database_Name]
     , SCHEMA_NAME(so.schema_id) AS [Schema_Name]
     , OBJECT_NAME(so.object_id) AS [Table_Name]
     , so.object_id              AS [object_id]
     , MAX(dmv.rows)             AS [Approximate_Rows]
     , MAX(d.ColumnCount)        AS [Column_Count]
FROM   sys.objects so (NOLOCK)
    JOIN sys.indexes si (NOLOCK)
        ON so.object_id = si.object_id
           AND so.type IN ( N''U'', N''V'' )
    JOIN sysindexes  dmv (NOLOCK)
        ON so.object_id = dmv.id
           AND si.index_id = dmv.indid
    FULL OUTER JOIN
         (
         SELECT   object_id
                , COUNT(1) AS ColumnCount
         FROM     sys.columns (NOLOCK)
         GROUP BY object_id
         )           d
        ON d.object_id = so.object_id
WHERE    so.is_ms_shipped = 0
         AND so.object_id NOT IN (
                                 SELECT major_id
                                 FROM   sys.extended_properties (NOLOCK)
                                 WHERE  name = N''microsoft_database_tools_support''
                                 )
         AND INDEXPROPERTY(so.object_id, si.name, ''IsStatistics'') = 0
GROUP BY so.schema_id
       , so.object_id
HAVING   (CASE OBJECTPROPERTY(MAX(so.object_id), ''TableHasClustIndex'')
              WHEN 0 THEN
                  COUNT(si.index_id) - 1
              ELSE
                  COUNT(si.index_id)
          END = 0
         )
ORDER BY Schema_Name
       , Table_Name;

end
';

SELECT *
FROM   #temp

DROP TABLE #temp

```
