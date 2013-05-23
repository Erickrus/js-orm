js-orm
======



   'js-orm' is the abbrevation for JavaScript based Sqlite ORMapping Library. After SQLite was successfully ported to javascript by 'emscripten', vast works can be done based on the Sqlite Javascript version. This library is a simple wrap up for the Sqlite. With this library, you will be able to easily do the conversion between object/array and sqlite table. Furthermore, a storage for SQlite database is made possible on Chrome and Firefox, which makes life easier.<br/>
    <br/>
   The main works including:<br/>
    <br/>
   1  Wrap a table/object level into the Class 'Table'<br/>
    <br/>
      1.1 Manage the metadata of a object/table<br/>
                constructor(name, column[]),<br/>
                  - Initialize the metadata from constructor.<br/>
                  - Normally, only table name will be provided and level column[] empty,<br/>
                  - since the table structure can be retrieved from following 2 functions<br/>
                retrieveStructure(db),<br/>
                  - Reload the DB Structure from Sqlite database and stores as metadata in object<br/>
                loadDDL(ddlSQL)<br/>
                  - load from a ddlSQL for Table definition<br/>
    <br/>
      1.2 Simplify DDL based on the metadata definition<br/>
                create(db), truncate(db), drop(db)<br/>
                  - Provide corresponding DDL statement to simplify the command<br/>
                  - e.g. db.exec('DELETE TABLE '+tablename+';'); <br/>
                  - will be converted to tableObject.drop();<br/>
    <br/>
      1.3 Simplify DML for upsert/delete on Array/Object Level<br/>
          delete(db, where)<br/>
                  - Straight wrap up for the delete statement with in the Table<br/>
          Arr : <br/>
               - insertArray(db, []), upsertArray(db, [])<br/>
                  -- insert/upsert the given array to specific table<br/>
                  -- Note, the order that data stored in the array shall be the same as create DDL SQL<br/>
          Obj : <br/>
               - insertObject(db, obj), upsertObject(db, obj)<br/>
                  -- insert/upsert the given object to specific table<br/>
               - getDefaultObject()<br/>
                  -- Important Feature, User do not need provide another definition of specific class for table<br/>
                  -- The system automatically create one using reflection<br/>
                  -- The conversion between 'Table Columns' and 'Class Fields' are completed by Inflection.js<br/>
    <br/>
      1.4 Simplify Select Retrieval. It Automatically converts result to corresponding object<br/>
                getObjects(db, where) - retrieve an array of objects<br/>
    <br/>
      1.5 Create 2 more classes (Column, Sequence) for holding metadata and database operations<br/>
                Column: colName, colType, colPrimaryKey<br/>
                Sequence: constructor(0), currentValue(), nextValue()<br/>
    <br/>
    <br/>
   2  Create a sqlUtil to store the data in Browser's LocalStorage<br/>
    <br/>
      2.1 Load from LocalStorage<br/>
          Load(filename) - files can be loaded when the page refresh/reopen<br/>
      2.2 Save to LocalStorage<br/>
          Save(filename) - whenever needed, the whole Sqlite database will be serialized and saved<br/>
    <br/>
   3  Requires: SQlite.js, Inflection.js, Strings.js, HexStreamReader.js, HexStreamWriter.js<br/>
    <br/>
    <br/>
   Hu, Ying-Hao(hyinghao@hotmail.com) - May, 2013<br/>
   Feel free to comment and to provide advices/suggestions.<br/>
    <br/>

