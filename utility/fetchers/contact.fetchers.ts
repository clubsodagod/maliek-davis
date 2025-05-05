"use server"
import { ContactInquiry as ContactInquiryType } from "@/components/contact-forms/GeneralDynamicContactForm";
import connectToDB from "@/database/connect-to-db.database";
import ContactForm, { IContactFormClient } from "@/database/models/cta-forms.model";
import ContactInquiry from "@/database/models/inquiry.model";



export async function submitCTAForm (form:IContactFormClient) {
    try {
        await connectToDB();
        
        const newForm = new ContactForm(form);
        

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

export async function submitInquiryForm (form:ContactInquiryType) {
    try {
        await connectToDB();
        
        const newForm = new ContactInquiry(form);
        

        if (newForm.name !== "") {
            newForm.save();
            return {error:false,message:"Contact form sent. I'll be in touch soon, looking forward to connecting with you!"}
        } else {
            throw new Error("There was an error submitting your contact form please try again.")
        }
        
    } catch (error) {
        return {error:true,message:`Error: ${error}`}
    }
}