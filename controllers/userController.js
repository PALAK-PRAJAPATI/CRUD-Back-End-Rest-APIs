// import User from '../models/userModels.js';

// export const fetch = async (req,res)=>{
//     try{


//     }
//     catch(error){

//     }
// }


// export const create = async(req,res)=>{
//     try{
//         const userData = new User(req.body);
//         const {email} = userData;
//         const userExist = await User.findOne({email});

//         if(userExist){
//             return res.status(400).json({message: "User already Exist"});
//         }
//         else{
//             const saveUser = await userData.save();
//             res.status(200).json(saveUser);
//         }
//     }
//     catch(error){
//         res.status(500).json({error: "Internal Server Error"});
//     }
// }


import User from "../models/userModels.js"

export const fetch = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: " Internal Server error" })
    }
}

export const create = async (req, res) => {
    try {

        const UserData = new User(req.body);
        const { email } = UserData; //destructuring email so that using email as unique key, we will be checking before inserting the data that is there same data(email) already exist or not so to prevent duplicate data.  

        const userExist = await User.findOne({ email });

        if (userExist) { //if above query returns any value that means  if(userExist) will return true
            return res.status(400).json({ message: "User already exist" })
        }
        else {
            const savedUser = await UserData.save();
            res.status(200).json(savedUser)
        }

    } catch (error) {
        res.status(500).json({ error: " Internal Server error" })
    }
}



export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });
        if (!userExist) {
            return res.status(404).json({ message: "user not found" });
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updateUser);
    }
    catch (error) {
        res.status(500).json({ error: " Internal Server error" })
    }
}


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id });
        if (!userExist) {
            return res.status(404).json({ message: "user not found" });
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({message:"User deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ error: " Internal Server error" })
    }
}