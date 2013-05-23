/* Org.BusinessObjects */

/*class*/ function HexStreamReader() {
   /*public String*/ this.stream = "";
   /*public long*/   this.position = 0;
   /*public void*/ this.Load = function(/*String*/ s) {
      this.stream = s.replaceAll("\n","").replaceAll("\r","").replaceAll(" ","");
      this.position = 0;
   };
   /*public void*/ this.Close = function() {
      //do nothing
   };
   /*public void*/ this.Seek = function(/*long*/ n) {
      this.position = n;
   };
   /*public long*/ this.GetPosition = function() {
      return this.position;
   };
   /*public byte*/ this.ReadByte = function() {
      var /*String*/ hexString = this.stream.substring(this.position*2, this.position*2+2);
      this.position ++;
      return parseInt(hexString, 16);
   };
   /*public UInt16*/ this.ReadUInt16 = function() {
      var /*int*/ result = 0;
      var /*String*/ hexString ="";
      for (var /*int*/ i=0;i<2;i++) {
         hexString = this.stream.substring((i+this.position)*2, (i+this.position)*2+2) + hexString;
      }
      this.position += 2;
      return parseInt(hexString, 16);
   };
   /*public UInt32*/ this.ReadUInt32 = function() {
      var /*int*/ result = 0;
      var /*String*/ hexString ="";
      for (var /*int*/ i=0;i<4;i++) {
         hexString = this.stream.substring((i+this.position)*2, (i+this.position)*2+2) + hexString;
      }
      this.position += 4;
      return parseInt(hexString, 16);
   };
   /*public String*/ this.ReadString = function() {
      var /*String*/ hexString = "";
      var /*int*/ len = this.ReadUInt16();
      
      hexString = "";
      for (var /*int*/ i=0;i<len;i++) {
         hexString += "%"+this.stream.substring((i+this.position)*2, (i+this.position)*2+2);
      }
      this.position += len;
      return this.DecodeUTF8(hexString);
   };
   /*public String*/ this.Skip = function(/*int*/ n) {
      var /*String*/ result = "";
      if (n<=0) return result;
      for (var /*int*/ i=0;i<n;i++){
      	var /*String*/ hexString = this.stream.substring(this.position*2, this.position*2+2);
        this.position ++;
        result += hexString;
        //this.ReadByte();
      }
      return result;
   };
   
   /*public String*/ this.DecodeUTF8 = function(/*String*/ str1) {
      var /*String*/ result ="";
      str1 = str1.replaceAll("%","");
      for (var /*int*/ i=0;i<str1.length/2;i++) {
         var /*int*/ b = parseInt("0x" + str1.substring(i*2,i*2+2));
         if (b<=127) {
            result += String.fromCharCode(b);
         } else {
            var /*String*/ t = "";
            for(var /*int*/ j=0;j<3;j++) {
            	t +="%"+str1.substring((j+i)*2,(j+i)*2+2);
               //result+="%"+str1.substring((j+i)*2,(j+i)*2+2);
            }
            i+=2;
            result += this.Utf8ToGb2312(" "+t);
         }
      }
      //result = this.Utf8ToGb2312(" "+result);
      if (result[0]==' ') {//remove the first " "
         result = result.substring(1,result.length);
      }
      return result;
   };
   /*public String*/ this.Utf8ToGb2312 = function(/*String*/ str1){
      var /*String*/ substr = "";
      var /*String*/ a = "";
      var /*String*/ b = "";
      var /*String*/ c = "";
      var /*int*/ i = -1;
      i = str1.indexOf("%");
      if(i==-1){
         return str1;
      }
      while(i!= -1){
         if(i<3){
            substr = substr + str1.substr(0,i-1);
            str1 = str1.substr(i+1,str1.length-i);
            a = str1.substr(0,2);
            str1 = str1.substr(2,str1.length - 2);
            if(parseInt("0x" + a) & 0x80 == 0){
               substr = substr + String.fromCharCode(parseInt("0x" + a));
            } else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte
               b = str1.substr(1,2);
               str1 = str1.substr(3,str1.length - 3);
               var /*String*/ widechar = (parseInt("0x" + a) & 0x1F) << 6;
               widechar = widechar | (parseInt("0x" + b) & 0x3F);
               substr = substr + String.fromCharCode(widechar);
            }else{
               b = str1.substr(1,2);
               str1 = str1.substr(3,str1.length - 3);
               c = str1.substr(1,2);
               str1 = str1.substr(3,str1.length - 3);
               var /*String*/ widechar = (parseInt("0x" + a) & 0x0F) << 12;
               widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
               widechar = widechar | (parseInt("0x" + c) & 0x3F);
               substr = substr + String.fromCharCode(widechar);
            }
         } else {
            substr = substr + str1.substring(0,i);
            str1= str1.substring(i);
         }
         i = str1.indexOf("%");
      }
      return substr+str1;
   };
   this.LoadStorage = function(sFileName) {
      var s= localStorage.getItem(sFileName);
      if (s==undefined) {
         throw "Exception: file "+sFileName+" not found";
      } else {
         this.Load(s);
      }
   };
};
