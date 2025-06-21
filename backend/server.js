import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary().then(() => {
    console.log('Connected to Cloudinary')
}
).catch((error) => {
    console.error('Error connecting to Cloudinary:', error)
})
// middleware

app.use(express.json())
app.use(cors())

// Api endpoints

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

// localhost:4000/api/admin/add-doctor

app.get('/', (req, res) => {
    res.send('API working')

})
app.listen(port, () => {
    console.log(`Example app listening on port`, port)
})