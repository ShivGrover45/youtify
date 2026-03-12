const mongoose=require('mongoose')

const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected")
    }catch(err){
        console.log("error in mongodb")
    }
}

module.exports=connectDb