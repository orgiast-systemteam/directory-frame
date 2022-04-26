function set_fx() {
  var ss = SpreadsheetApp.openById("1fnojUj4bPY-j7AK6oLZApcXDEbO0invIKeATbpy3Mh4");
  var sh = ss.getSheetByName("検収フォーム（オージャスト案件用）")
  var lr = sh.getLastRow();
  Logger.log(lr)
  sh.getRange("I"+lr).setValue("=task(D"+lr+")")
  return lr
}
