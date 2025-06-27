/* 
debugging 
or inspecting in Android browsers
are a pain hence
*/

jdbg = {
  dbgarea: null,
  inspect: function(w){
   if(this.dbgarea == null){
     this.addwin();
   }
   var iarea = document.getElementById(this.dbgarea);
   iarea.value = (typeof(w) == "string" ) ? w : w.toString();
  },
  addwin: function(){
   this.dbgarea = this.getid();
   const textarea = document.createElement('textarea');

    // Set attributes for the textarea
    textarea.id = this.dbgarea;
    textarea.name = 'myTextareadebug';
    textarea.rows = 5;
    textarea.cols = 30;

    // Append the textarea to the body before the closing tag
    document.body.appendChild(textarea);
  },
  getid: function(){
      var now = new Date();
      var segs = [now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0')];
    return "jinsp_" + segs.join("_");
  }

}
