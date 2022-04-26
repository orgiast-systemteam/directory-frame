var token =['H1wyoF08fcHKccsrkmVlZsvpumODLFlZfJ8yrNqhpPh']
function Line_notify(e) {
  var ary =  e.response.getItemResponses();
  for(var i=0;i<ary.length;i++){
    var question = ary[i].getItem().getTitle();
    if(question == "案件担当プロデューサー"){
      var answer = ary[i].getResponse();
      Logger.log(answer) 
    }else if(question == "依頼を受けているお仕事の名前"){
      var job = ary[i].getResponse();
    }
  }
  var content = "投稿がありました。\n"
              +answer+"様　ご確認をお願いします。\n"
              +"https://docs.google.com/spreadsheets/d/1fnojUj4bPY-j7AK6oLZApcXDEbO0invIKeATbpy3Mh4/edit#gid=994277695"
  sendPostContent(content)
  var lr = set_fx()
  set_url(job,lr)
}

function sendPostContent(content) {
  var options = {
    "method": "post",
    "payload" : {"message": content },
    "headers": {"Authorization": "Bearer " + token}    
  };
  Logger.log(content)
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}