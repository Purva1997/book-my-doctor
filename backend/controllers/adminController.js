
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
// API for adding Doctor

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Adds a new doctor to the database.
 * @param {Object} req.body - The request body containing the doctor's details.
 * @param {string} req.body.name - The doctor's name.
 * @param {string} req.body.email - The doctor's email.
 * @param {string} req.body.password - The doctor's password.
 * @param {string} req.body.specialization - The doctor's specialization.
 * @param {string} req.body.degree - The doctor's degree.
 * @param {string} req.body.experience - The doctor's experience.
 * @param {string} req.body.about - The doctor's about.
 * @param {number} req.body.fees - The doctor's fees.
 * @param {Object} req.body.address - The doctor's address.
 * @param {Object} req.file - The doctor's image.
 * @returns {Object} - A JSON response containing a success message and the added doctor's details.
 */
const addDoctor = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const { name, email, password, specialization, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        // console.log({ name, email, password, specialization, degree, experience, about, fees, address, imageFile }, imageFile);
        //checking for all data to add doctor
        if (!name || !email || !password || !specialization || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.json({ success: false, message: "All fields are required" });
        }
        // validating email formate
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });

        }
        // validating password formate
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        // hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            specialization,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.json({ success: true, message: "Doctor added successfully" });
        // console.log(doctorData);
    }

    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}
// API for admin login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // checking for admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, message: "Login successful", token: token });
        }
        else {
            console.log('Invalid Credentials...');
            res.json({ success: false, message: "Invalid Credentials" });
        }


    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

//API for getting all doctors list for admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, message: "Doctors fetched successfully", doctors: doctors });
    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

//API to get all appointments list

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, message: "Appointments fetched successfully", appointments: appointments });
    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

//API for appointment cancellation

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });


        // releasing doctor slots

        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter((slot) => slot !== slotTime);

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        res.json({ success: true, message: "Appointment cancelled successfully" });
    }
    catch (error) {
        console.error("Error to cancell the appointment", error);
        res.json({ success: false, message: error.message });
    }
}
//API to get Dashboard data for admin panel

const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointment: appointments.reverse().slice(0, 7)
        }
        res.json({ success: true, message: "Dashboard data fetched successfully", dashData: dashData });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }

}
export { addDoctor, adminDashboard, adminLogin, allDoctors, appointmentCancel, appointmentsAdmin };

