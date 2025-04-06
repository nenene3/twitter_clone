import mongoose from "mongoose";

const schema = new  mongoose.Schema({
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

schema.index({ following: 1, user: 1 }, { unique: true })

export const FollowModel = mongoose.model('Follow', schema)