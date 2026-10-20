import dns from 'dns';
import express from 'express';
import cors from 'cors';
import  'dotenv/config';
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';



dns.setServers(['8.8.8.8', '1.1.1.1']);


//app config
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Connect to Cloudinary
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints

app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter),


app.get('/', (req, res) => {
    res.send('API Working')
})

app.listen(port, () => {
    console.log("Server is started", port)
})