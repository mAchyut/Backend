import mongoose, {Schema} from "mongoose";

const tweetSchema = new Schema({
    content:{
        required: true,
        type: String
    },
    content:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps:true})

export const Tweet = mongoose.model("Tweet", tweetSchema)