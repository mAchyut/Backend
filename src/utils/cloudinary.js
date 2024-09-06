import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    })
})()

const uploadOnCloudinary = async (localFilePath)=>{

    try {
        if(!localFilePath){
            return null
        }else{
          const response =  cloudinary.uploader.upload(localFilePath, {
                resource_type: 'auto'
            })
            console.log('File has been uploaded to cloudinary', (await response).url)
            return response
        } 
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved file if upload gets failed 
        return null
    }
}

export {uploadOnCloudinary}