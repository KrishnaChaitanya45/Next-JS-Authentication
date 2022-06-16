// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { HashedPassword } from "../../../lib/AuthPassword";
import { ConnectToDatabase } from "../../../lib/database";

export default async function handler(req, res) {
  if(req.method=== 'POST'){

  
  const entereddata = req.body;
  const { email, password } = entereddata;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length<7
  ) {
    return res.status(402).json({ message: "Invalid Login Credenetials" });
  }

  const client = await ConnectToDatabase();
  const db =  client.db();
  const UserExists = await db.collection("Registered-Users").findOne({
    email:email
  });
  if(UserExists){
    res.status(404).json({message:`Hello ${email} Your Are Already Registered`});
    client.close();
    return;

  }
  const SaltedPassword = await HashedPassword(password);

  const result = await db.collection("Registered-Users").insertOne({
    email: email,
    password: SaltedPassword,
  });
  res.status(201).json({ message:"Hurrah...! Created The User!"});
  client.close();
}
res.status(405).json({message:"Error"})
}
