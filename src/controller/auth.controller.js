const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const register=async (req,res)=>{
    const {username,email,password,role='user'}=req.body
    
        
        const isAlreadyExist=await userModel.findOne({
            $or:[{username},{email}]
        })
        if(isAlreadyExist){
            return res.status(409).json({
                message:"User Already exists"
            })
        }
        const hash=await bcrypt.hash(password,10)
        const user=await userModel.create({
            username,email,
            password:hash
            ,role
        })
        console.log(user)
        const token=jwt.sign({
            id:user.__id,
            role:user.role
        },process.env.JWT_SECRET)
        res.cookie('token',token)

        res.status(201).json({
            message:"user successfully created",
            user:{
                user
            }
        })

    
    
}

const login=async (req,res)=>{
    const {username,email,password}=req.body
    const user=await userModel.findOne({
        $or:[{username},{email}]
    })
    if(!user){
        return res.status(409).json({
            message:"Invalid Credentials"
        })
    }
    const isValidPassword=await bcrypt.compare(password,user.password)
    if(!isValidPassword){
        return res.status(401).json({
            message:"Ivalid Credentials"
        })
    }
        const token=jwt.sign({
            id:user._id,
            role:user.role
        },process.env.JWT_SECRET)
        res.cookie('token', token, {
  httpOnly: true,
  sameSite: 'none',
  secure: true
})
    res.status(200).json({
        message:"User logged in Successfully",
        user
    })
}


module.exports={register,login}