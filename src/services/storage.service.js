const {ImageKit}=require('@imagekit/nodejs')

const client=new ImageKit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY
})
/*
const uploadFile=async(file)=>{
    console.log(file)
    const result=await client.files.upload({
        file,
        filename:"music_"+Date.now()+".mp3",
        folder:"youtify/music"
    }) 
    console.log(result)
    return result
}
    */

async function uploadFile(file){
    const result=await client.files.upload({
        file,
        fileName:"music_"+Date.now(),
        folder:"youtify/music"
    })
    return result
}

module.exports={uploadFile}