const app = require("./app");
const  sequelize  = require("./database/sequelize");
const dotenv = require("dotenv")

//Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught exception`);
  process.exit(1);
});

dotenv.config();

//Server
const port = process.env.PORT || 4000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the Database");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running in http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error: " + err);
  });
















