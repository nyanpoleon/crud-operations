const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

const Student = mongoose.model("Student", {
  firstName: String,
  lastName: String,
  rollNo: Number,
  techStack: String,
});

app.get("/", (req, res) => {
  res.json({ message: "All Good!" });
});

app.get("/students", (req, res) => {
  Student.find()
    .then((students) => {
      res.json({ students });
    })
    .catch((err) => {
      res.json({ error: "Something went wrong" });
    });
});

app.get("/students", (req, res) => {
  const student = new Student({
    firstName: "John",
    lastName: "Khan",
    rollNo: "21",
    techStack: "MEVN",
  })
  student
    .save()
    .then((students) => {
      res.json({ students });
    })
    .catch((err) => {
      res.json({ error: "Something went wrong" });
    });
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection established");
      console.log("Serrver running on http://localhost:8000");
    })
    .catch((err) => console.log("DB connection failed", err));
});
