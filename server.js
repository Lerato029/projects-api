/* ============================================Server with Express========================================*/
//Exporting express module
const express = require("express");

//used to visualize endpoints/requests oon the terminal when testing server with postman
const morgan = require("morgan");

//importing routes module
const routes = require("./routes");

//initialize express function
const app = express();

/* =====================================Use Method To Initiate Modules ====================== */
app.use(express.json());

app.use(morgan("dev"));

//Access routes folder
app.use("/api", routes);

/* =====================================Defining Root Route PORT============================= */
const PORT = 8080;
app.listen(PORT, () =>
  console.log(`listening on PORT:${PORT} At: http://localhost:${PORT}/api`)
);
