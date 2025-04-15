const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () =>{
  console.log(`Server is running on http://localhost:${port}`);
})
