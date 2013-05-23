js-orm
======
   	<div>
			&nbsp;</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp;</div>
		<div>
			&quot;js-orm&quot; is the abbrevation for JavaScript based Sqlite ORMapping Library. After SQLite was successfully ported to javascript by &quot;emscripten&quot;, vast works can be done based on the Sqlite Javascript version. This library is a simple wrap up for the Sqlite. With this library, you will be able to easily do the conversion between object/array and sqlite table. Furthermore, a storage for SQlite database is made possible on Chrome and Firefox, which makes life easier.</div>
		<div>
			&nbsp;</div>
		<div>
			The main works including:</div>
		<div>
			&nbsp;</div>
		<div>
			1 &nbsp;Wrap a table/object level into the Class &quot;Table&quot;</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp; &nbsp;1.1 Manage the metadata of a object/table</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;constructor(name, column[]),</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- Initialize the metadata from constructor.</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- Normally, only table name will be provided and level column[] empty,</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- since the table structure can be retrieved from following 2 functions</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;retrieveStructure(db),</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- Reload the DB Structure from Sqlite database and stores as metadata in object</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;loadDDL(ddlSQL)</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- load from a ddlSQL for Table definition</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp; &nbsp;1.2 Simplify DDL based on the metadata definition</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;create(db), truncate(db), drop(db)</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- Provide corresponding DDL statement to simplify the command</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- e.g. db.exec(&quot;DELETE TABLE &quot;+tablename+&quot;;&quot;);&nbsp;</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- will be converted to tableObject.drop();</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp; &nbsp;1.3 Simplify DML for upsert/delete on Array/Object Level</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp;delete(db, where)</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;- Straight wrap up for the delete statement with in the Table</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp;Arr :&nbsp;</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - insertArray(db, []), upsertArray(db, [])</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-- insert/upsert the given array to specific table</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-- Note, the order that data stored in the array shall be the same as create DDL SQL</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp;Obj :&nbsp;</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - insertObject(db, obj), upsertObject(db, obj)</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-- insert/upsert the given object to specific table</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - getDefaultObject()</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-- Important Feature, User do not need provide another definition of specific class for table</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-- The system automatically create one using reflection</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;-- The conversion between &quot;Table Columns&quot; and &quot;Class Fields&quot; are completed by Inflection.js</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp; &nbsp;1.4 Simplify Select Retrieval. It Automatically converts result to corresponding object</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;getObjects(db, where) - retrieve an array of objects</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp; &nbsp;1.5 Create 2 more classes (Column, Sequence) for holding metadata and database operations</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Column: colName, colType, colPrimaryKey</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Sequence: constructor(0), currentValue(), nextValue()</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp;</div>
		<div>
			2 &nbsp;Create a sqlUtil to store the data in Browser&#39;s LocalStorage</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp; &nbsp;2.1 Load from LocalStorage</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp;Load(filename) - files can be loaded when the page refresh/reopen</div>
		<div>
			&nbsp; &nbsp;2.2 Save to LocalStorage</div>
		<div>
			&nbsp; &nbsp; &nbsp; &nbsp;Save(filename) - whenever needed, the whole Sqlite database will be serialized and saved</div>
		<div>
			&nbsp;</div>
		<div>
			3 &nbsp;Requires: SQlite.js, Inflection.js, Strings.js, HexStreamReader.js, HexStreamWriter.js</div>
		<div>
			&nbsp;</div>
		<div>
			&nbsp;</div>
		<div>
			Hu, Ying-Hao(hyinghao@hotmail.com) - May, 2013</div>
		<div>
			Feel free to comment and to provide advices/suggestion</div>
		<div>
			&nbsp;</div>
