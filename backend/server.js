const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// --------------------------deployment---------------------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) => {
    const index = path.join(__dirname, "frontend", "build", "index.html");
    res.sendFile(index);
  });

  // res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
}

// 2nd
// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("frontend/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
//   });
// }

// 3

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(process.cwd(), "frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(process.cwd(), "./frontend/build/index.html"));
//   });
// }

// app.use(express.static(path.resolve(__dirname, "./frontend/build")));
// // Step 2:
// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
// });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`its started on ${PORT}`));
