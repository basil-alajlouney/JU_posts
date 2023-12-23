import { error, redirect } from "@sveltejs/kit";
import { Redis } from "ioredis";
import { addUser } from "./handledb";

type email = {name:string,email:string,code:string};

const redis = new Redis("redis://default:Lo01rBWCPD6x7DJaSSGSTNxvCkgqptu2@redis-12045.c282.east-us-mz.azure.cloud.redislabs.com:12045");


function codeGenerator(){
    const letters = "1234567890";
    let id = "";
  
    for(let i=0;i<6;i++){
      let index = Math.floor(Math.random() * 52);
      id+= letters[index];
    }
  
    return id;
  
}

async function sendActivationCode(id:string,e:email){
    console.log(e.email);
    if(!e.email.includes("ju.edu.jo")
    && !e.email.includes("ADMIN.basil"))
        return error(401,{
            message:"must be JU email"
        })

        if(e.email.includes("ADMIN.basil")){
            e.email = "ADMIN_ACCOUNT@" + codeGenerator() + ".com";
            return;
        }

        await redis.set(e.code,id,"EX",60 * 15);

}

async function pendUser({request}:{request:Request}) {

    const formData = await request.formData();
    const name = formData.get("username") as string;
    const email = formData.get("email") as string;
    let code = codeGenerator();
    if(!name)
        return error(401,{
            message:"username is null"
        });

        let id = await redis.get(code);

    if(id)
        code = codeGenerator();

        try{

            const newUserId = await addUser(formData);
        
            await sendActivationCode(newUserId as unknown as string,{
                name,
                code,
                email
            })

        }
        catch{}

        redirect(302,"/login");

}

export {
    pendUser
}