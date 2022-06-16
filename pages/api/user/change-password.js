import {getSession} from 'next-auth/react';
import { VerifyPassword } from '../../../lib/AuthPassword';
import { HashedPassword } from '../../../lib/AuthPassword';
import { ConnectToDatabase } from '../../../lib/database';
export default async function handler(req,res){
    if(req.method !== 'PATCH'){
        return;
    }

    const session = await getSession({req:req});
    if(!session){
        res.status(401).json({message:"Not Authenticated!!"});
        return ;
    }

    const client = await ConnectToDatabase();
    const userCollection = client.db().collection("Registered-Users");
    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

     const user = await userCollection.findOne({email:userEmail});
     if(!user){
        res.status(402).json({message:"User Not Found...!"});
        client.close();
     }

     const currentPassword = user.password;
     const isPasswordsSame = await VerifyPassword(oldPassword,currentPassword);

    if(!isPasswordsSame){
        res.status(401).json({message:"Incorrect Passoword ... Check Your Password"});
        client.close();

    }
    const hashednewpassword = await  HashedPassword(newPassword)
   const result = await  userCollection.updateOne({email:userEmail},{ $set:{password:hashednewpassword}});
    
    client.close();
    res.status(201).json({message:"passoword changed successfully..!"});
}