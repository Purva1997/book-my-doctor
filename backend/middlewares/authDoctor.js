import jwt from 'jsonwebtoken';
const authDoctor = (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        console.log('token:', dtoken)
        if (!dtoken) {
            return res.json({ success: false, message: "Not authorized login again" })
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        console.log('token_decode', token_decode, req.body)
        req.body = req.body || {}
        req.body.docId = token_decode.id
        next()
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export default authDoctor