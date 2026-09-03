import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

if (!process.env.CONNECTION_STRING) {
  throw new Error("CONNECTION_STRING env variable is missing! Check .env.local file.");
}
const client = new MongoClient(process.env.CONNECTION_STRING);
const db =  client.db("mediCare");
export const auth = betterAuth({
     emailAndPassword: { 
    enabled: true, 
  }, 
  
  database: mongodbAdapter(db, {
     // Optional: if you don't provide a client, database transactions won't be enabled.
    client
    
  }),

   user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,      
        defaultValue: "Patient",
        input: true,         
      },
    },
  }
  
});
