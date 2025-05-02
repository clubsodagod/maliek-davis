"use server"
import connectToDB from "@/database/connect-to-db.database";
import ContactForm, { IContactFormClient } from "@/database/models/cta-forms.model";



export async function submitCTAForm (form:IContactFormClient) {
    try {
        await connectToDB();
        console.log(form);
        
        const newForm = new ContactForm(form);
        newForm.type = "consultation"
        

        if (newForm.name !== "") {
            newForm.save();
            return {error:false,message:"Contact form sent. I'll be in touch soon, looking forward to connecting with you!"}
        } else {
            throw new Error("There was an erro submitting your contact form please try again.")
        }
        
    } catch (error) {
        return {error:true,message:`Error: ${error}`}
    }
}