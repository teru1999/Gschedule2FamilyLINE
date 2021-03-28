function sendline(){
  
  // 1. 〇〇に取得したトークンを入力。
  const LINE_NOTIFY_TOKEN = '〇〇';
  
  // 2. このスクリプトをGASに貼り付けて、sendline()のトリガーを投稿したい時間帯に設定してください。

  const ENDPOINT = 'https://notify-api.line.me/api/notify';
  let today = new Date();
  let events = CalendarApp.getDefaultCalendar().getEventsForDay(today);
  let message = '';
  
  // ログ
  Logger.log('info: ' + today);
  Logger.log('info: ' + events)
  
  // 予定の追加
  for(var i = 0; i < events.length; i++){
    let strTitle = events[i].getTitle();
    let strStart = HHmm(events[i].getStartTime());
    let strEnd = HHmm(events[i].getEndTime());
    
    // 終日の分岐
    if(strStart ===　strEnd){
      message += `\n予定${(i+1)}：${strTitle}\n終日\n`
    }else{
      message += `\n予定${(i+1)}：${strTitle}\n開始時刻：${strStart}\n終了時刻：${strEnd}\n`
    }
  }

  // トークンのチェック
  if (LINE_NOTIFY_TOKEN === null) {
    Logger.log('error: LINE_NOTIFY_TOKEN is not set.')
    return
  }

  // メッセージのプロパティ
  const options = {
    'method': 'POST',
    'headers': {'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`},
    'payload': {'message': message},
  }

  // log
  Logger.log('info: ' + message)

  // 送信
  UrlFetchApp.fetch(ENDPOINT, options)
  
};

// 時刻を見やすくする
function HHmm(str){
  return Utilities.formatDate(str, 'JST', 'HH:mm');
}


