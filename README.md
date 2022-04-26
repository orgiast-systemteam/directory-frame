# 検収依頼 投稿フォーム（各案件の外注パートナーより届く検収依頼） ([URL](https://docs.google.com/forms/d/11-V-Jsce_8_WKIrnqJ-agAs8w1fTmHXuMm2LqAHXSS0/edit#response=ACYDBNjWaGPRWWdV3TNVd4cZj7YIDetcfiHZKk3-YhBKbCY-DSV4oWDXRbhF9ZFuskGJANU))

## 全体の機能
- 検収依頼 投稿フォーム([URL](https://docs.google.com/spreadsheets/d/1fnojUj4bPY-j7AK6oLZApcXDEbO0invIKeATbpy3Mh4/edit#gid=994277695)に依頼が送信された場合にスクリプトが実行される。

## 依頼の概要
- Line Notifyを使用し、ライングループにGoogle Formで投稿されたフォームの一部を通知する。

## ファイル構造

```
.
├── .github
│   └── workflows
│       └── deploy.yml
├── README.md
└── src
    ├── appsscript.json
    ├── sheet.js
    └── *.js
```

### Line 通知【経理✕プロデューサー】.js

- Line_notify(e)
  - 説明
- Formに回答された場合の、情報を取得する。
  - 必要な内容（今回は案件担当プロデューサー）の値をLineグループに特定の文言とともに送信する。

- sendPostContent(content)
  - Lineを送信するために必要な情報が記載されている。

### カスタム関数張り付け.js

- set_fx()
  - Formが投稿された場合に最終行を取得し、その行に自動でカスタム関数 [=task(Dx)]を転記する。※xは可変する数字　←　Formを送信するごとに実行

### url張り付け

- set_url(text,lr)
  - Formが投稿された場合、その投稿された「依頼を受けているお仕事の名前」の情報を取得し、案件一覧シートのD列にある情報を取得する。　← Formを送信するごとに実行