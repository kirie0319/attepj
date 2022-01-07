# :blush:Atte:blush:

## 環境構築

.env ファイルの DB 設定を編集

```sh
composer i
php artisan migrate:fresh
php artisan key:generate
php artisan serve
```

## ページ一覧

<details><summary>購入者用</summary>

| パス        | ページ         | メモ                                       |
| :---------- | :------------- | :----------------------------------------- |
| /register   | 新規登録       | 登録後自動でログインし、ログイン画面に遷移 |
| /login      | ログイン画面   | ログイン後ホーム画面に遷移                 |
| /           | 打刻ページ     | 出勤、退勤、休憩用画面                     |
| /attendance | 日付別勤怠情報 | 日付別に勤怠を管理                         |

</details>
