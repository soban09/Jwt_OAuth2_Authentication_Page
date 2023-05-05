import { User } from '../db/userModel.js'

export const extractUser = async (req, res) => {
    
    try{
        const user = await User.findOne({_id : req.params.id});
        if(!user){
            return res.status(400).json({ message: "User not found" })
        }
        else{
            return res.status(200).json({message:"User found!", user})
        }
    }
    catch(err){
        console.log(err);
    }
}

export const updateUser = async (req, res) => {
    try{
        await User.updateOne({_id:req.params.id}, {$set : {fname : 'foo'}})
    }   
    catch(err){
        console.log(err);
    }
}
