import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Availability updated successfully" });

    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }
}

const doctorList = async (req, res) => {
    console.log('req.body', req.body);
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, message: "Doctors fetched successfully", doctors: doctors });
    }
    catch (error) {
        console.error("Error adding doctor:", error);
        res.json({ success: false, message: error.message });
    }

}


//API for doctor login

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, message: "Login successful", token: token });
        }
        else {
            console.log('Invalid Credentials...');
            res.json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.error("Error for doctor login:", error);
        res.json({ success: false, message: error.message });
    }
}

//API to get doctor appointment for doctor panel

const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        console.log('docId', docId)
        const appointments = await appointmentModel.find({ docId });
        console.log('appointments', appointments)
        res.json({ success: true, message: "Appointments fetched successfully", appointments: appointments });

    } catch (error) {
        console.error("Error for doctor login:", error);
        res.json({ success: false, message: error.message });
    }
}

//API to mark appointment completed
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        console.log('appointmentData', appointmentData, 'docId', docId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            return res.json({ success: true, message: "Appointment completed successfully" });
        }
        else {
            return res.json({ success: false, message: "Mark Failed" });
        }
    }
    catch (error) {
        console.error("Error for complete appointment:", error);
        res.json({ success: false, message: error.message });

    }
}


//API to mark appointment Cancelled
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            return res.json({ success: true, message: "Appointment Cancelled successfully" });
        }
        else {
            return res.json({ success: false, message: "cancellation Failed" });
        }
    }
    catch (error) {
        console.error("Error for complete appointment:", error);
        res.json({ success: false, message: error.message });

    }
}
// API to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        })
        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointment: appointments.reverse().slice(0, 7)
        }
        res.json({ success: true, message: "Dashboard data fetched successfully", dashData });

    } catch (error) {
        console.error("Error for complete appointment:", error);
        res.json({ success: false, message: error.message });

    }
}
//API to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        res.json({ success: true, message: "Profile fetched successfully", profileData });

    } catch (error) {
        console.error("Error to fetch profile", error);
        res.json({ success: false, message: error.message });

    }
}

//API to update doctor profile for doctor panel

const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
        res.json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        console.error("Error to update profile", error);
        res.json({ success: false, message: error.message });

    }
}
export {
    appointmentCancel,
    appointmentComplete,
    appointmentsDoctor,
    changeAvailability,
    doctorDashboard,
    doctorList,
    doctorProfile,
    loginDoctor,
    updateDoctorProfile
};

