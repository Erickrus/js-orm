/* Javascript Object Relation Mapping (SQL wrap-script)
     Classes
        class Table:
           Meta: constructor(name, column[]),
                 retrieveStructure(db),
                 loadDDL(ddlSQL) - useful
           Sql : create(db),
                 truncate(db),
                 drop(db),
                 delete(db, where)
           Arr : insertArray(db, []),
                 upsertArray(db, [])
           Obj : insertObject(db, obj),
                 upsertObject(db, obj),
                 getDefaultObject(),
                 getObjects(db, where)
        class Column:
           colName, colType, colPrimaryKey
        class Sequence:
           constructor(0), currentValue(), nextValue()
      Objects
         sqlUtil: Load(fname), Save(db,fname)

      Requires: sql.js, inflection.js, strings.js, HexStreamReader.js, HexStreamWriter.js
*/

/*class*/ function Column(/*String*/ pColName, /*String*/ pColType) {
   /*public String*/  this.colName = pColName;
   /*public String*/  this.colType = pColType;
   /*public Boolean*/ this.colPrimaryKey = false;
};

/*class*/ function Table(/*String*/ pTableName, /*ArrayList*/ pColumns) {
   /*public ArrayList*/ this.tableName   = pTableName;
   /*public ArrayList*/ this.Columns = pColumns;
   /*public void*/ this.drop = function(db) {
      var /*String*/ ddlSQL = "DROP TABLE "+ this.tableName +";";
      //alert(ddlSQL);
      db.exec(ddlSQL);
   };
   /*public void*/ this.delete = function(db, pWhere) {
      var /*String*/ dmlSQL = "DELETE FROM "+ this.tableName +" WHERE "+pWhere+" ;";
      //alert(dmlSQL);
      db.exec(dmlSQL);
   };
   /*public void*/ this.create = function(db) {
      var /*String*/ ddlSQL = "CREATE TABLE "+ this.tableName +"(";
      var columnList = "";
      for (var i=0;i<this.Columns.length;i++) {
         columnList+= this.Columns[i].colName + " " + this.Columns[i].colType;
         if (this.Columns[i].colPrimaryKey) {
            columnList += " PRIMARY KEY";
         }
         if (i!=this.Columns.length-1) {
            columnList += ",";
         }
      }
      ddlSQL += columnList+");";
      //alert(ddlSQL);
      db.exec(ddlSQL);
   };
   /*public void*/ this.truncate = function(db) {
      var /*String*/ ddlSQL = "DELETE FROM "+ this.tableName +";";
      //alert(ddlSQL);
      db.exec(ddlSQL);
   };
   /*void*/ this.loadDDL=function(ddlSQL) {
      var /*ArrayList*/ aColumns;
      
      ddlSQL = ddlSQL.substring(
                     ddlSQL.indexOf("(")+1,
                     ddlSQL.lastIndexOf(")")
                  );
      aColumns = ddlSQL.split(",");
      this.Columns = [];
   
      for (var i=0;i<aColumns.length;i++) {
      	 var temp = aColumns[i].trimSpaces();
      	 var pk = false;
      	 if (temp.indexOf(" PRIMARY KEY") >=0) {
      	    temp=temp.replaceAll(" PRIMARY KEY","");
      	    pk = true;
      	    temp = temp.trimSpaces();
      	 }
      	 
         var /*ArrayList*/  aElement = temp.split(" ");
         
         var /*Column*/ mc = new Column(aElement[0].toUpperCase(), aElement[1].toUpperCase());
         mc.colPrimaryKey = pk;
         this.Columns.push(mc);
      }
   }
   /*void*/ this.retrieveStructure =function(db) {
      var /*String*/ ddlSqlResultSet = db.exec("SELECT SQL FROM SQLITE_MASTER WHERE UPPER(TYPE) = 'TABLE' AND UPPER(TBL_NAME)='"+this.tableName.toUpperCase()+"' ;");
      var /*String*/ ddlSQL = ddlSqlResultSet[0][0].value.toUpperCase().replaceAll("  "," ");
      this.loadDDL(ddlSQL);
   };
   //Make sure, just insert into 1 row each time
   /*void*/ this.insertArray= function(db, valArray, upsert) {   
      var columnList = "";
      for (var i=0;i<this.Columns.length;i++) {
         if (i!=this.Columns.length-1) {
            columnList += this.Columns[i].colName +", ";
         } else {
            columnList += this.Columns[i].colName;
         }
      }
      if (upsert) {
      	 columnList = "REPLACE INTO "+this.tableName+" ("+columnList+") VALUES (";
      } else {
         columnList = "INSERT INTO "+this.tableName+" ("+columnList+") VALUES (";
      }

      var valueList = "";
      for (var i=0;i<this.Columns.length;i++) {
         var columnName = this.Columns[i].colName;
         var columnType = this.Columns[i].colType;
         var columnValue = valArray[i];
         
         //Processing with the CHAR, VARCHAR
         if (columnType.toUpperCase().indexOf('CHAR') >=0) {
             columnValue = (columnValue).replaceAll("'","''");
             columnValue = "'" + columnValue + "'";
         }
   
         if (i!=this.Columns.length-1) {
            valueList += columnValue +", ";
         } else {
            valueList += columnValue +");";
         }
      }
      //alert(columnList +valueList);
      db.exec(columnList +valueList);
   };
   /*void*/ this.upsertArray= function(db, valArray) {
      this.insertArray(db, valArray, true);
   };
   /*void*/ this.insertObject= function(db, obj, upsert) {
      var valArray = this.seralize(obj);
      this.insertArray(db, valArray, upsert);
   };
   /*void*/ this.upsertObject= function(db, obj) {
      var valArray = this.seralize(obj);
      this.insertArray(db, valArray, true);
   };
   /*void*/ this.seralize = function(obj) {
      var result = new Array();
      for (var i=0;i<this.Columns.length;i++) {
      	 var sPhysicalColumn = this.Columns[i].colName;
      	 var sFieldName = sPhysicalColumn.camelize(true);
         result.push(obj[sFieldName]);
      }
      return result;
   };
   /*Object*/ this.getDefaultObject = function() {
      var sHeader = "function "+this.tableName.camelize()+"(){ ";
      var sFields = "";
      var result = new Array();
      for (var i=0;i<this.Columns.length;i++) {
      	 var sPhysicalColumn = this.Columns[i].colName;
      	 var sDefaultValue = (this.Columns[i].colType.toUpperCase().indexOf("CHAR")>=0)?"='';":"=0;";
      	 sFields += "this."+sPhysicalColumn.camelize(true)+sDefaultValue;
      }
      return eval("new "+sHeader+sFields+"}();");
   };
   /*Object*/ this.getObjects = function(db, pWhere) {
      var rset = db.exec("SELECT * FROM "+this.tableName+" WHERE "+pWhere+";");
      var result = new Array();
      for (var i=0;i<rset.length;i++) {
         var row = rset[i];
         var obj = this.getDefaultObject();
         for (var j=0;j<row.length;j++) {
            var sFieldName = row[j].column.camelize(true);
            obj[sFieldName] = row[j].value;
         }
         result.push(obj);
      }
      return result;
   };
};

/*class*/ function Sequence(/*int*/ start) {
   /*public ArrayList*/ this.current   = start;
   /*public String*/ this.currentValue = function() {
      return this.current;
   };
   /*public String*/ this.nextValue = function() {
      this.current++;
      return this.current;
   };
};

var sqlUtil = {
   Load: function(sFileName) {
      var r = new HexStreamReader();
      r.LoadStorage(sFileName);
      try {
         var sdata = new Uint8Array(r.stream.length/2);
         for (var i=0;i<r.stream.length/2;i++) {
            sdata[i] = r.ReadByte();
         }
         var db = SQL.open(sdata);
         return db;
      } catch(e) {
      	 return null;
      }
   },
   Save: function(db, sFileName) {
      var sdata = db.exportData();
      var w =  new HexStreamWriter();
      for (var i=0;i<sdata.length;i++) {
         w.WriteByte(sdata[i]);
      }
      w.SaveStorage(sFileName);
   }
};


