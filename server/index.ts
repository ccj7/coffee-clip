import app from "./app";

const PORT: number = 7000;
app.listen(PORT, () :void => {
  console.log(`Start on port ${PORT}.`);
});
