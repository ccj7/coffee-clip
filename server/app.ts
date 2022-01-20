import express from "express";
import shopRoute from "./shop/route";
import userRoute from "./user/route";

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

export default app;
