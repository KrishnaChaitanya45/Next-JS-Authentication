import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"
import { VerifyPassword } from "../../../lib/AuthPassword";
import { ConnectToDatabase } from "../../../lib/database";
export default NextAuth({
    session:{
        jwt:true
    },
    providers:[
        CredentialsProvider({
            async authorize(credentials){
                const client = await  ConnectToDatabase();
                const UserCollection = client.db().collection("Registered-Users");
                const user = await UserCollection.findOne({
                    email:credentials.email
                });
                if(!user){
                    client.close();
                    throw new Error("User Not Found!");
                  
                }
                const isValid = await VerifyPassword(credentials.password , user.password);
                if(!isValid){
                    client.close();
                    throw new Error("Check Your Password");
                    
                }
                return { email: user.email}
                client.close();


            }
        })

    ]

})