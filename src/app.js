const express=require('express')
const authRouter=require('./routes/auth.routes')
const musicRouter=require('./routes/music.routes')
const cookie=require('cookie-parser')
const cors=require('cors')
const app=express()

app.use(cors({
    origin:'https://youtify-frontend.vercel.app',
    credentials:true
}))
app.use(express.json())
app.use(cookie())

app.use('/api/auth',authRouter)
app.use('/api/music',musicRouter)

module.exports=app