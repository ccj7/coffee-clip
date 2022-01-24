import app from "./app";
import runSeedShop from "./shop/seed";

const PORT: number = 7000;

runSeedShop()

app.listen(PORT, () :void => {
  console.log(`Start on port ${PORT}.`);
});
