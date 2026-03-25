const jwt=require('jsonwebtoken')

const authArtist=async (req,res,next)=>{

 const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        if(decoded.role!=="artist"){
             return res.status(403).json({
            message:"Forbidden"
        })
        }
        req.user=decoded
        next()
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    
            
            

}

const authUser=async (req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
    
    if(decoded.role!="user"){
        return res.status(403).json({
            message:"Access not allowed"
        })
    }
     req.user=decoded.role
     next()
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}

module.exports={authArtist,authUser}