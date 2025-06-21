import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay';
import validator from 'validator';
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }
        // validating email formate
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be minimum 8 characters" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = await userModel.create(userData);
        const user = await newUser.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token: token });

    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

// API for User login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // checking for user credentials
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
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

//API to get user profile data

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        console.log('userData', userData, 'UserId', userId);

        res.json({ success: true, userData });
    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}


// API to Update user profile

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data missing" });
        }
        console.log('req.body', { userId, name, phone, address, dob, gender, bdy: req.body });
        await userModel.findByIdAndUpdate(userId, { name, phone, address, dob, gender });
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageURL = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageURL });
        }
        res.json({ success: true, message: "Profile updated successfully" });
    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

//API for Book appointment

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available" });
        }

        let slots_booked = docData.slots_booked;

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot already booked" });
            }
            else {
                slots_booked[slotDate].push(slotTime);
            }
        }

        else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId);
        console.log('print user data', userData);
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now()
        }
        const newAppointment = await appointmentModel(appointmentData);
        await newAppointment.save();

        // Save new slots data and doctor data

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully" });
    }

    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

// API to get user appointments for frontend my appointments page
const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments });

    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

// Cancel appointment

const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify appointment User
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }
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
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

// API to make payment of appointment using razorpay

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or does not exist" });

        }
        //Creating option for razorpay
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }
        //creation of an order
        const order = await razorpayInstance.orders.create(options);
        console.log('order', order);
        res.json({ success: true, order });

    } catch (error) {
        console.error("Error for payment:", error);
        res.json({ success: false, message: error.message });
    }


}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        console.log('orderInfo', orderInfo)
        if (orderInfo.status === 'paid') {

            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        }
        else {
            res.json({ success: false, message: "Payment failed" });
        }

    }
    catch (error) {
        console.error("Error for payment:", error);
        res.json({ success: false, message: error.message });
    }
}

export { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay };

