import { MongoClient } from "mongodb";
export async function ConnectToDatabase(){
    const client = await new MongoClient('mongodb+srv://Krishna:krishnakiran@cluster0.w78qw.mongodb.net/auth-dev?retryWrites=true&w=majority');
    return client;
}