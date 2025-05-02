

export default async function credentialUserLogin(password: string, credential: string) {

    try {

        // define credential object
        const credentials = {
            credential: credential, secret: password
        }

        console.log(credentials);


        const user = await fetch(`${process.env.NEXT_PUBLIC_DEVELOPMENT_API_URL}/user/authentication/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specify JSON content type
            },
            body: JSON.stringify({
                credentials, // Credentials from the state
                type: "admin", // Additional property
            }),
        });

        // Check for response status and handle errors
        if (!user.ok) {
            throw new Error(`HTTP error! Status: ${user.status}`);
        }

        // Parse the JSON response
        const data = await user.json();
        console.log("User data:", data);
        console.log(user);
        return data
    } catch (error: unknown) {
        console.log(error);
        return null
    }
}