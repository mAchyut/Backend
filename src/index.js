import { configDotenv } from 'dotenv'
import dbConnect from './db/index.js'


configDotenv('../env')
dbConnect( )

