const express = require("express");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const dbConnect = require("./connection");
const multer = require("multer");

const app = express();
// app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer storage configuration
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const uploads = multer({ storage: fileStorage });

// Insert Employee with Image
app.post("/insertimage", uploads.single("profile"), async (req, res) => {
    let db = await dbConnect();

    const { EmployeeName, EmployeeSalary, Department } = req.body;
    const ProfilePhoto = req.file.filename;

    let result = await db.collection("Employee").insertOne({
        EmployeeName: EmployeeName,
        EmployeeSalary: Number(EmployeeSalary),
        Department: Department,
        ProfilePhoto: ProfilePhoto,
    });

    res.send(result);
});
  
// get all data
app.get("/get", async (req, res) => {
    let db = await dbConnect();
    let result = await db.collection("Employee").find({}).toArray();
    res.send(result);
});

// add data
// app.post("/post", async (req, res) => {
//     let db = await dbConnect();
//     let result = await db.collection("Employee").insertOne({
//         EmployeeName: req.body.EmployeeName,
//         EmployeeSalary: Number(req.body.EmployeeSalary),
//         Department: req.body.Department,
//         ProfilePhoto: req.body.ProfilePhoto
//     });
//     res.send(result);         
// });

// delete
app.delete("/:id", async (req, res) => {
    let db = await dbConnect();
    let result = await db.collection("Employee").deleteOne({
        _id: new ObjectId(req.params.id)
    });
    res.send(result);
});

// update
app.patch("/:id", async (req, res) => {
    let db = await dbConnect();
    let result = await db.collection("Employee").updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
    );
    res.send(result); 
});

// search - filter
app.get("/search/:key", async (req, res) => {
    let db = await dbConnect();
    let result = await db.collection("Employee").find({
        Department: { $regex: req.params.key, $options: "i" }
    }).toArray();
    res.send(result);
});

app.listen(3000, () => {
    console.log("Server start");
});
