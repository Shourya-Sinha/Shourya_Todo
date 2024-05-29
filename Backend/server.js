const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const databaseConnect = require("./Config/Database");
dotenv.config();
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const userRouter = require('./Routes/userRoute');
const taskRouter = require('./Routes/taskRoute');
const path = require("path");
//const config = require('../.env');

const app = express();
const PORT = process.env.PORT || 3001;
//condb();


//const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (cloudinary.config().cloud_name) {
  console.log("Cloudinary connected successfully");
} else {
  console.error("Error connecting to Cloudinary");
}

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());
// app.use(cors({
//   origin: 'https://shourya-todo.onrender.com',  // Replace with your actual frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true
// }));


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1',userRouter);
app.use('/api/v1',taskRouter);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});
// app.use(express.static(path.join(__dirname, '../../Frontend/dist')));  // Adjusted path
// //const config = require('../')
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));  // Adjusted path
// });

// const staticPath = path.join(__dirname, '../Frontend/dist');
// app.use(express.static(staticPath));

// app.get('*', (req, res, next) => {
//   if (req.accepts('html') && req.originalUrl.startsWith('/api')) {
//     return next(); // Skip to the next middleware
//   }
//   res.sendFile(path.join(staticPath, 'index.html'));
// });
app.listen(PORT, () => {
  databaseConnect();
  console.log(`Server is running on 🚀 http://localhost:${PORT}🚀 `);
});
