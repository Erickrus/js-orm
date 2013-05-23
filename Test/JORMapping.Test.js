// Run tests
//   var db = SQL.open();
//   var mFT1 = new Table('FT1', []);
//   mFT1.loadDDL("CREATE TABLE FT1(T1_ID INTEGER PRIMARY KEY, D2_ID INTEGER, ATTR VARCHAR(100));");
//   mFT1.create(db);
//
//   var sFT1 = new Sequence(0);
//   mFT1.insertArray(db, [sFT1.nextValue(),1,'some\' other number']);
//   mFT1.insertArray(db, [sFT1.nextValue(),2,'moar numberz']);
//
//   db.exec("CREATE TABLE DT2(D2_ID INTEGER PRIMARY KEY,ATTR VARCHAR(100));");
//   var mDT2 = new Table('DT2', []);
//   mDT2.retrieveStructure(db);
//   var sDT2 = new Sequence(0);
//   mDT2.insertArray(db, [sDT2.nextValue(), '111some other number']);
//   mDT2.insertArray(db, [sDT2.nextValue(), '222moar numberz']);
//
//
//   mFT1.drop(db);
//   mFT1.create(db);
//   mFT1.insertArray(db, [sFT1.nextValue(),1,'some\' other number']);
//   mFT1.insertArray(db, [sFT1.nextValue(),2,'moar numberz']);
//   mFT1.insertArray(db, [sFT1.nextValue(),3, 'AAA oar numberz']);
//
//   mFT1.upsertArray(db, [sFT1.currentValue(),2,'AAA oar numberz']);
//   mFT1.delete(db, 'T1_ID<5')
//
//   
//   mFT1.insertArray(db, [sFT1.nextValue(),3, 'AAA oar numberz']);
//   
//   var m = mFT1.getDefaultObject();
//   m.t1Id = 99;
//   m.d2Id = 0;
//   m.attr = 'aaa3defwsr5';
//   //var m = new Ft1();
//   mFT1.upsertObject(db, m);
//   
//   var result1 = mFT1.getObjects(db, "T1_ID>=5");
//   var result = db.exec("SELECT * FROM FT1 WHERE T1_ID>=5; ");
//   alert(JSON.stringify(result, null, '  '));
//
//   db.close();
