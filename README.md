# COFEEE CLIP☕️

COFFEE CLIP は、コーヒーを身近に感じてコーヒーで暮らしをもっと豊かにするための、コーヒー専門 SNS です。
[COFFEE CLIP](http://ec2-13-231-157-112.ap-northeast-1.compute.amazonaws.com/)

## コンセプト

コロナ禍でおうち時間が増えた人たちの間でコーヒーの需要が伸びており、また、以前から自宅でコーヒーを飲んでいる人の中には豆にこだわる人も多いので、コーヒーの情報を収集したり、発信する場を作りたいと考えました。

## 始め方

### インストール

1. このレポジトリをクローンして下さい

```sh
$ git clone https://github.com/ccj7/coffee-clip.git
```

2. 依存関係のインストール

```sh
// フロントエンド
$ cd front
$ npm i

// サーバーサイド
$ cd server
$ npm i
```

3. env ファイルを使って環境変数を設定して下さい

【プロジェクト全体 (.env)】

```
MONGO_INITDB_ROOT_USERNAME=your_USER_NAME
MONGO_INITDB_ROOT_PASSWORD=your_PASSWORD
MONGO_INITDB_DATABASE=your_DATABASE
ME_CONFIG_MONGODB_ADMINUSERNAME=your_USER_NAME
ME_CONFIG_MONGODB_ADMINPASSWORD=your_PASSWORD
ME_CONFIG_MONGODB_URL=your_URL
MONGODB_URL=your_URL
```

【フロントエンド (/front/.env)】

```
NEXT_PUBLIC_FIREBASE_APIKEY= your_API_KEY
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN= your_AUTHDOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID= your_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= your_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= your_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID= your_APP_ID
NEXT_PUBLIC_FIREBASE_MEASURENEBT_ID= your_MEASURENEBT_ID
```

【サーバー (/server/.env)】

```
S3_ACCESS_KEY_ID= your_ACCESS_KEY
S3_SECRET_ACCESS_KEY= your_SECRET_ACCESS_KEY
STRIPE_SECRET_KEY= your_SECRET_KEY
STRIPE_ACCOUNT_ID= your_ACCOUNT_ID
```

4. 開発環境は以下のコマンドで立ち上げてください

```bash
// フロントエンド
$ cd front
$ npm run dev

// サーバー
$ cd server
$ npm run dev
```

5. ビルドしたい場合は、以下のコマンドで実行できます

```bash
$ npm run build
```

## テストの実行方法

API サーバーにはテストを用意しています。以下のコマンドを実行してテストを行うことができます。

`/api/shops/` と `/api/users/` のエンドポイントに対してテストが行われます。

```
$ cd server
$ npm run test
```

## デプロイメント

1. デプロイしたいサーバーに COFFEE CLIP のソースをコピーします。
2. 以下のコマンドを使って COFFEE CLIP のアプリケーションを立ち上げることができます。

```
$ docker-compose build
$ docker-compose up
```

## テックスタック

- [Next.js](https://nextjs.org/) - フロントエンドフレームワーク
- [Firebase Authentication](https://firebase.google.com/docs/auth/) - ユーザー認証
- [Chakra UI](https://chakra-ui.com/) - UI コンポーネントライブラリ
- [Stripe](https://stripe.com/jp) - 決済システム
- [Express](http://expressjs.com/) - Web アプリケーション・フレームワーク
- [MongoDB](https://www.mongodb.com/) - データベース
- [mongoose](https://mongoosejs.com/) - ORM
- [Mocha](https://mochajs.org/) - テストフレームワーク
- [Chai](https://www.chaijs.com/) - アサーションフレームワーク

## Authors

テックリード:[Maho Miyata](https://github.com/mahomiyata)
フロントエンド:[Mei Omomo](https://github.com/mei-omomo) & [Nao Nomura](https://github.com/naonmr)  
バックエンド:[Maho Miyazawa](https://github.com/Maho-Miyazawa) & [Motoki Mizuno](https://github.com/Motoki-tech)
