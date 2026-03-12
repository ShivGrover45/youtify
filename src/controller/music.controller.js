const musicModel=require('../models/music.model')
const jwt=require('jsonwebtoken')
const {uploadFile}=require('../services/storage.service')
const postMusic=async(req,res)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=='artist'){
            return res.status(403).json({
                message:"Forbidden"
            })
        }
    
    const {title}=req.body
    const file=req.file
    console.log(file)
    const result= await uploadFile(file.buffer.toString('base64'))
    console.log(result)
    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:decoded.id
    })
    res.status(201).json({
        message:"music created succesfully",
        music
    })
}
    catch(err){
        console.log(err)
        return res.status(401).json({
           err
        })
    }
}

module.exports={postMusic}