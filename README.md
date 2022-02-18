# readmeのテンプレート最後にこの部分消す
# スプレッドシート名 ([URL](URLのリンク))

## 全体の機能
- (このスプレッドシートで行うこと)
- (例) 月額報酬をアシスタントタスクリストに毎月1日に転送する

## 依頼の概要
- （説明）
- （例）"https://docs.google.com/spreadsheets/d/1QCW86DIri6nryqheFKw8Cr6e9Ce0YRV6FvFFW0zqBnc/edit?resourcekey#gid=316020554
こちらのシートに投稿された時に、lineグループに内容を自動通知していただきたいです。
通知する内容やlineグループは、担当がつきましたら別途ご連絡いたします。"


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

### sheet.js

汎用性高めの関数をこちらに配置

- 関数名
  - 説明
- 例：insertData(sheet, data, row = 1, col = 1)
  - 指定された行と列を左上の基準としてデータ(二次元配列)を挿入

### *****.js

- 関数名
  - 説明

### （例）transfer_assistant.js

- AssistantTaskMark()
  - 済タスクに完了日を入力する ← 毎日実行
- AssistantTaskComplete()
  - 先月分のタスクをまとめてアシスタント業務へ反映 ← 毎月 1 日に実行 3 時に

