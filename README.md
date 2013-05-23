js-orm
======



"js-orm" is the abbrevation for JavaScript based Sqlite ORMapping Library. After SQLite was successfully ported to javascript by "emscripten", vast works can be done based on the Sqlite Javascript version. This library is a simple wrap up for the Sqlite. With this library, you will be able to easily do the conversion between object/array and sqlite table. Furthermore, a storage for SQlite database is made possible on Chrome and Firefox, which makes life easier.

The main works including:

1  Wrap a table/object level into the Class "Table"
   1.1 Manage the metadata of a object/table
             constructor(name, column[]),
                Initialize the metadata from constructor.
                Normally, only table name will be provided and level column[] empty,
                since the table structure can be retrieved from following 2 functions
             retrieveStructure(db),
                Reload the DB Structure from Sqlite database and stores as metadata in object
             loadDDL(ddlSQL)
                load from a ddlSQL for Table definition
   1.2 Simplify DDL based on the metadata definition
             create(db), truncate(db), drop(db)
                Provide corresponding DDL statement to simplify the command
                e.g. db.exec("DELETE TABLE "+tablename+";"); 
                will be converted to tableObject.drop();
   1.3 Simplify DML for upsert/delete on Array/Object Level
       delete(db, where)
                Straight wrap up for the delete statement with in the Table
       Arr : insertArray(db, []), upsertArray(db, [])
                insert/upsert the given array to specific table
                Note, the order that data stored in the array shall be the same as create DDL SQL
       Obj : insertObject(db, obj), upsertObject(db, obj)
                insert/upsert the given object to specific table
             getDefaultObject()
                Important Feature, User do not need provide another definition of specific class for table
                The system automatically create one using reflection
                The conversion between "Table Columns" and "Class Fields" are completed by Inflection.js
   1.4 Simplify Select Retrieval. It Automatically converts result to corresponding object
             getObjects(db, where) - retrieve an array of objects
   1.5 Create 2 more classes (Column, Sequence) for holding metadata and database operations
             Column: colName, colType, colPrimaryKey
             Sequence: constructor(0), currentValue(), nextValue()

2  Create a sqlUtil to store the data in Browser's LocalStorage
   2.1 Load from LocalStorage
       Load(filename) - files can be loaded when the page refresh/reopen
   2.2 Save to LocalStorage
       Save(filename) - whenever needed, the whole Sqlite database will be serialized and saved

3  Requires: SQlite.js, Inflection.js, Strings.js, HexStreamReader.js, HexStreamWriter.js

Hu, Ying-Hao(hyinghao@hotmail.com) - May, 2013
Feel free to comment and provide advices/suggestion

