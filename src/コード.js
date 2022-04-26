/**
 *  フォルダ一覧を取得し本フォームのリストアイテムにセットする
 *
 *  トリガー: 2時間ごと
 */
function getFolderList() {
  var names = [];
  
  // 1.project
  // https://drive.google.com/drive/folders/0B4U7jwDkjHb_NkNnVXVwYW5vbUE
  var folders = DriveApp.getFolderById("0B4U7jwDkjHb_NkNnVXVwYW5vbUE").getFolders();
  while(folders.hasNext()) {
    var folder = folders.next();
    var name = folder.getName();
    if(/^[0-9]{4,}[A-Za-z]{2,}/.test(name) ) {
      names.push(name);
    }
  }
  
  // 00.アプローチリスト
  // https://drive.google.com/drive/folders/0B4U7jwDkjHb_b2lsa1lFLUZZTkE
  /*
  var folders = DriveApp.getFolderById("0B4U7jwDkjHb_b2lsa1lFLUZZTkE").getFolders();
  while(folders.hasNext()) {
    var folder = folders.next();
    var name = folder.getName();
    if(/^[0-9]{4,}[A-Za-z]{2,}/.test(name) ) {
      names.push(name);
    }
  } 
  */
  
  // 安江さまご依頼 ウェルクス追加 2018.9.5 追加 Nozomu.Kon
  // https://drive.google.com/drive/folders/0BxN7z2EDwuk9SERSRl85cFhCQkU
  var folders = DriveApp.getFolderById("0BxN7z2EDwuk9SERSRl85cFhCQkU").getFolders();
  while(folders.hasNext()) {
    var folder = folders.next();
    var name = folder.getName();
    if(/^[0-9]{4,}[A-Za-z]{2,}/.test(name) ) {
      names.push(name);
    }
  } 
  
  // 白川さん依頼 ウェルクス お仕事フェア
  // https://drive.google.com/drive/u/0/folders/1N9NXMMLe23MuViRfO3E3sqY2lEaEUyjD
  /*
  var folders = DriveApp.getFolderById("1N9NXMMLe23MuViRfO3E3sqY2lEaEUyjD").getFolders();
  while(folders.hasNext()) {
    var folder = folders.next();
    var name = folder.getName();
    if(/^[0-9]{4,}[A-Za-z]{2,}/.test(name) ) {
      names.push(name);
    }
  } 
  */
  
  // ポルシェジャパン追加
  // https://drive.google.com/drive/u/0/folders/0B4U7jwDkjHb_cGs4cDd6MTQ2Y3M
  /*
  var folders = DriveApp.getFolderById("0B4U7jwDkjHb_cGs4cDd6MTQ2Y3M").getFolders();
  while(folders.hasNext()) {
    var folder = folders.next();
    var name = folder.getName();
    if(/^[0-9]{4,}[A-Za-z]{2,}/.test(name) ) {
      names.push(name);
    }
  } 
  */
  
  // 学会（ネクサスエージェント様）追加 2021.08.30
  // https://drive.google.com/drive/u/0/folders/1LStFi6FmihcZRZ_xvOUyA3g5mSKXeGPW
  /*
  var folders = DriveApp.getFolderById("1LStFi6FmihcZRZ_xvOUyA3g5mSKXeGPW").getFolders();
  while(folders.hasNext()) {
    var folder = folders.next();
    var name = folder.getName();
    if(/^[0-9]{4,}[A-Za-z]{2,}/.test(name) ) {
      names.push(name);
    }
  } 
  */
  
  // 学会（トラスティパートナーズ様）追加 2021.08.30
  // https://drive.google.com/drive/u/0/folders/1DQ1BlZavndTJ1QlaKNnF3byIx2Ts9lXX
  /*
  var folders = DriveApp.getFolderById("1DQ1BlZavndTJ1QlaKNnF3byIx2Ts9lXX").getFolders();
  while(folders.hasNext()) {
    var folder = folders.next();
    var name = folder.getName();
    if(/^[0-9]{4,}[A-Za-z]{2,}/.test(name) ) {
      names.push(name);
    }
  } 
  */

  // 学会（FLT様）追加 2021.08.30
  // https://drive.google.com/drive/u/0/folders/1vamTB-rwK8gNrRiPTC1rWn4kzpZoyl8N
  /*
  var folders = DriveApp.getFolderById("1vamTB-rwK8gNrRiPTC1rWn4kzpZoyl8N").getFolders();
  while(folders.hasNext()) {
    var folder = folders.next();
    var name = folder.getName();
    if(/^[0-9]{4,}[A-Za-z]{2,}/.test(name) ) {
      names.push(name);
    }
  } 
  */
  
  Logger.log(names);
  
  // 重複削除
  names = names.filter(function(e,i,a){return a.indexOf(e)===i});
  // 降順ソート
  names.sort(function(a,b){
    if(a > b) return -1;
    if(a < b) return 1;
    else  return 0;
  });
  
  var form = FormApp.getActiveForm();
  var items = form.getItems();
  for(var i=0; items.length; i++) {
    if(items[i].getTitle() == "議事録のシートの場所") {
      items[i].asListItem().setChoiceValues(names);
      break;
    }
  }
  
}




////////////////////////
function sendNotice(e) {


  var tantou = "";
  var client = "";
  var rokuon = "";
  var url = "";
  var note = "";
  var date = "";

  var responses = e.response.getItemResponses();
  for(var n = 0; n<responses.length; n++) {
    var resp = responses[n].getResponse();
    var item = responses[n].getItem().getTitle();

    if(item.test("担当者")) {
      tantou = item;
    }
    else if(item.test("打合せ録音日")) {
      date = new Date();
    }
    else if(item.test("録音データアップロード")) {
      rokuon = item.split(",").join("\n");
    }
    else if(item.test("議事録のシートの場所")) {
      var reg = /([^()]+)\(([^_]+)_([^)]+)\)/.exec(resp);
      url = "";

      if(!reg || reg.length<4) {
        continue;
      }

      var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/14RC6og1ma_I3LGHwCVwswKArgHwCOPxWlPB3g8adaYY/edit");
      var sheet = ss.getSheetByName("案件一覧");
      var list = sheet.getRange("D:L").getValues()
      .filter(
        function(e){
          return e[6]==this.cd && e[7]==this.cl && e[8]==this.sbj;
        },
        {"cd":reg[1], "cl": reg[1], "sbj": reg[2]}
      );
      if(list.length>0) {
        url = list[0][0];
      }
    }
    else if(item.test("備考")) {
      note = item;
    }
  }

  var body = "";
  body += "新しく録音データがアップロードされました。\n";
  body += "\n";
  body += "皆さま、大変お世話になっております。\n";
  body += "録音データのアップロードが行われましたが、現時点では、まだ議事録不要です。\n";
  body += "議事録作成の作業依頼があった場合のみ議事録の作成をおねがいいたします。\n";
  body += "担当者名："+ tantou +"\n";
  body += "クライアント名："+ client +"\n";
  body += "アップロード日："+ Utilities.formatDate(date, "JST","yyyy年M月d日 h時m分") +"\n";
  body += "実施計画議事録URL："+ url +"\n";
  body += "録音データ："+ rokuon +"\n";
  body += "備考："+ note +"\n";
  body += "作業マニュアル: https://sites.google.com/a/orgiast.jp/shanai/gyoumu-nouhau/yi-shi-luno-zuo-cheng-lu-yindetakarano-chou-chu\n";
  body += "\n";
  body += "ご対応の程どうぞよろしくお願いいたします。";
          
  var recipient = "trigger@applet.ifttt.com";
  var subject = "新規録音データ登録のお知らせ#gijiroku";
          
  GmailApp.sendEmail(recipient, subject, body, {bcc: "nishi@orgiast.jp"});
}


function t ()
{
  var reg = /([^()]+)\(([^_]+)_([^)]+)\)/.exec("220930CRB(株式会社サイバー大学_大学の15周年式典の企画/運営)");
  Logger.log(reg);
}
