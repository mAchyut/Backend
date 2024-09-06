import { configDotenv } from 'dotenv'
import dbConnect from './db/index.js'
import app from './app.js'


configDotenv('./env')
dbConnect( )
.then((value)=>{

 app.on('error', (error)=>{
    console.log(`Error on :: ${error}`)
    throw error
 })

 app.listen(process.env.PORT || 8000, ()=>{
    console.log(`⁜ Server is running at port ${process.env.PORT ? process.env.PORT : 8000}`)
 })
}

)
.catch((error)=>{
    console.log('MONGODB Connection failed ::', error)
})