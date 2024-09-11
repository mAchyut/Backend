import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { configDotenv } from 'dotenv';

configDotenv('./env');

;(async function() {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
})();

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        console.log('File has been uploaded to cloudinary :: url :', response.url);
        fs.unlinkSync(localFilePath)
        
        return response;

    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        // console.log("line 30 error:: ", error);
        return null;
    }
};

export { uploadOnCloudinary };