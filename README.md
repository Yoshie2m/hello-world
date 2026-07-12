# hello-world

名古屋グルメの情報を整理・発信する静的Webサイト。

## 概要

- フロントエンドのみ（HTML5 / CSS3 / バニラJS）で完結する構成
- サーバーサイドの機能は使わず、静的ホスティングを想定

## 現在の状態

初回データ（`index.html` / `css/style.css` / `js/app.js` / `data/gourmet.json`）を実装済み。詳細な技術スタック・フォルダ構成は [CLAUDE.md](CLAUDE.md) を参照。

## 実行方法

`js/app.js` が `data/gourmet.json` を `fetch` で読み込む都合上、`index.html` を直接ブラウザで開く（`file://`）と読み込みに失敗する場合がある。ローカルサーバー経由で開くこと。

```bash
python3 -m http.server 8000
```

起動後、ブラウザで以下にアクセスする。

```
http://localhost:8000/index.html
```
