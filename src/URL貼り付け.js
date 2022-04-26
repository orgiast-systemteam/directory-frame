function set_url(text,lr) {
  //text = "220408NWS(株式会社日本ワークス_令和4年度 社員総会)"
  //lr = 4
  var ss = SpreadsheetApp.openById("1fnojUj4bPY-j7AK6oLZApcXDEbO0invIKeATbpy3Mh4")
  var sh = ss.getSheetByName("案件一覧（関数）");
  var matter = sh.getDataRange().getValues();
  var sh = ss.getSheetByName("検収フォーム（オージャスト案件用）")
  var code = text.slice(0,text.indexOf("("))
  var matter_name = text.slice(text.indexOf("_")+1,text.indexOf(")"))
  for(var i=0;i<matter[0].length;i++){
    if(matter[0][i] == "案件名"){
      var m_n = i;
    }else if(matter[0][i] == "ｺｰﾄﾞ"){
      var c_n = i;
    }else if(matter[0][i] == "実施計画URL" && url == null){
      var url = i;
    }
  }
  var m = []
  var c = []
  for(i=0;i<matter.length;i++){
    if(matter[i][m_n].indexOf(matter_name) >= 0){
      m.push(i)
    }
    if(matter[i][c_n] == code){
      c.push(i)
    }
  }
  if(m.length == 1 && c.length == 1){
    if(m[0] == c[0]){
      Logger.log(matter[m[0]][url])
      sh.getRange("J"+lr).setValue(matter[m[0]][url])
    }
  }else if(m.length == 0 || c.length == 0){
    return ""
  }else {
    for(i=0;i<m.length;i++){
      for(var j=0;j<c.length;j++){
        if(m[i] == c[j]){
          Logger.log(matter[m[0]][url])
          sh.getRange("J"+lr).setValue(matter[m[0]][url])
        }
      }
    }
  }
}