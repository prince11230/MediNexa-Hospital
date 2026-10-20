import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctorModel.js";
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


//API for adding doctor
const addDoctor = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body || {};
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || fees === undefined || !address) {
            return res.status(400).json({ success: false, message: "All doctor fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please provide a valid email address" });
        }

        if(password.length < 8) {
            return res.status(400).json({ sucess: false, message: "set strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!imageFile) {
            return res.status(400).json({ success: false, message: "Doctor image is required" });
        }

        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(409).json({ success: false, message: "A doctor with this email already exists" });
        }

        let parsedAddress;
        try {
            parsedAddress = typeof address === "string" ? JSON.parse(address) : address;
        } catch {
            return res.status(400).json({ success: false, message: "Address must be valid JSON" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
       
        const doctor = new doctorModel({
            name, email, password: hashedPassword, image: imageUpload.secure_url,
            speciality, degree, experience, about, fees: Number(fees),
            address: parsedAddress,
            date: Date.now(),
        });

        await doctor.save();
        return res.status(201).json({ success: true, message: "Doctor added successfully" });

        

    } catch (error) {
        console.error("Add doctor error:", error);
        return res.status(500).json({ success: false, message: error.message || "Unable to add doctor" });
    }
}

//Api for Admin Login

const loginAdmin = async (req, res) => {

    try {

        const { email, password}= req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else{
            res.json({success: false, message:"Invalid credentails"})

        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API to get all doctors list
const allDoctors = async (req, res) => {

    try {
        const doctors = await doctorModel.find({}).select('-password');
        return res.json({ success: true, doctors });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//API to get all appointments list
const appointmentAdmin = async (req, res) => {

    try {
        
        const appointments = await appointmentModel.find({})

        res.json({success:true, appointments})


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
        
    }
}

const appointmentCancel = async (req, res) => {
    
    try {
        const {  appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })  

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = (slots_booked[slotDate] || []).filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: 'Appointment cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
        
    }
}

//API to get DASHABOARD data fro ADMIN panel
const  adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors : doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success: true, dashData})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addDoctor, loginAdmin, allDoctors, appointmentAdmin, appointmentCancel, adminDashboard}