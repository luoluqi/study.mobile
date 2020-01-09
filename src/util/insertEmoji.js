export default function (objid,str){
    var myField=document.getElementById(""+objid);
    //IE浏览器
      if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = str;
        sel.select();
      }
     
      //火狐/网景 浏览器
      else if (myField.selectionStart || myField.selectionStart == '0')
      {
      //得到光标前的位置
        var startPos = myField.selectionStart;
        //得到光标后的位置
        var endPos = myField.selectionEnd;
        // 在加入数据之前获得滚动条的高度
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + str + myField.value.substring(endPos, myField.value.length);
        //如果滚动条高度大于0
        if (restoreTop > 0) {
          // 返回
          myField.scrollTop = restoreTop;
        }
        myField.focus();
        myField.selectionStart = startPos + str.length;
        myField.selectionEnd = startPos + str.length;
      }
      else {
        myField.value += str;
        myField.focus();
      }
    }