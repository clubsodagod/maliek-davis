'use server'

export async function submitForm(event: { target: HTMLFormElement | undefined; }) {
    const formData = new FormData(event.target);
    const rawContactFormData = {
        company: formData.get('company'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        inquiryType: formData.get('inquiryType'),
    }
    return rawContactFormData
}