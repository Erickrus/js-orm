/* System.IO */

//implemented the basic funciton, append only
/*class*/ function HexStreamWriter() {
   /*public String*/ this.stream = "";
   /*public long*/   this.position = 0;
   /*public long*/ this.GetPosition = function() {
      return this.position;
   };
   /*public long*/ this.WriteByte = function(/*byte*/ n) {
      var /*String*/ hexString = n.toString(16);
      hexString = ((hexString.length<2)?"0":"") + hexString;
      this.stream += hexString.toUpperCase();
      this.position ++;
      return this.position;
   };
   /*public long*/ this.WriteUInt16 = function(/*UInt16*/ n) {
      var /*String*/ hexString = n.toString(16);
      hexString = hexString.leftPad("0",4);
      var /*String*/ result = "";
      for (var /*int*/ i=1;i>=0;i--) {
         result += hexString.substring(i*2,i*2+2).toUpperCase();
      }
      this.stream += result.toUpperCase();
      this.position+=2;
      return this.position;
   };
   /*public long*/ this.WriteUInt32 = function(/*UInt32*/ n) {
      var /*String*/ hexString = n.toString(16);
      hexString = hexString.leftPad("0",8);
      var /*String*/ result = "";
      for (var /*int*/ i=3;i>=0;i--) {
         result += hexString.substring(i*2,i*2+2);
      }
      this.stream += result.toUpperCase();
      this.position+=4;
      return this.position;
   };
   /*public long*/ this.WriteString = function(/*String*/ s) {
      var /*String*/ hexString = encodeURI(s);
      var /*String*/ result ="";
      var /*int*/ len = 0;
      for (var /*int*/ i=0;i<hexString.length;i++) {
         if (hexString[i] != '%') {
            var /*String*/ s = hexString.charCodeAt(i).toString(16);
            s = ((s.length<2)?"0":"") + s;
            result += s;
         } else {
            result += hexString.substring(i+1,i+3);
            i+=2;
         }
      }
      len = result.length/2;
      this.WriteUInt16(len);
      this.stream += result.toUpperCase();
      this.position += Math.floor(result.length / 2);
      return this.position;
   };
   /*public long*/ this.WriteRaw = function(/*String*/ pRaw) {
      var /*String*/ s1 = (pRaw +"").replaceAll(" ","").replaceAll("\r","").replaceAll("\n","");
      this.stream += s1;
      this.position = s1.length / 2;
      return this.position;
   };
   /*public String*/ this.FormatStream = function() {
      var /*String*/ result ="";
      var /*int*/ count=0;
      for (var /*int*/ i=0;i<this.stream.length/2;i++) {
         result += this.stream.substring(i*2, i*2+2)+" ";
         if (i!=0 && i%16==15) {
            result += "\n";
        }
      }
      return result;
   };
   this.SaveStorage = function(sFileName) {
      localStorage.setItem(sFileName, this.FormatStream());
   };
};
