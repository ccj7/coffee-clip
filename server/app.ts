import express from "express";
import shopRoute from "./shop/route";
import userRoute from "./user/route";

// TODO: デプロイ時の接続確認用に読み込んでいます。あとで削除すること！
import kittySchema from "./schema/sampleSchema";
import connectToDB from "./db-connection";
import mongoose from "mongoose";
import { Request, Response } from 'express'
// ここまで削除

const app: express.Express = express();
app.use(express.json());

// ToDo: CROS対応 要検討（以下は本番環境ではだめ絶対）
// app.use(
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "*");
//     next();
//   }
// );

app.use("/api/shops", shopRoute);
app.use("/api/users", userRoute);

// TODO: デプロイ時の接続確認用のテストパスです。あとで削除すること！
app.get("/api/test", async (req, res) => {
  await connectToDB()
  const data = await mongoose.model('Kitten', kittySchema).find();
  res.send(data);
})
app.post("/api/test", async (req: Request, res: Response) => {
  const data = req.body;
  const Kitten = mongoose.model('Kitten', kittySchema);
  const newKitten = new Kitten(data);
  await connectToDB()
  await newKitten.save()
  res.send("created!")
})
// テストパスここまで

export default app;
