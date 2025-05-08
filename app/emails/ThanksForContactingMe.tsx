import { Heading, Text, Button, Html, } from "@react-email/components";
import * as React from 'react';

const ThanksForContactingMe:React.FC<{firstName:string}> = ({firstName}) => {
    const name = firstName ? firstName : null
    return (
        <Html>
            <div style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Heading as="h1" style={{ color: '#333', marginBottom: '10px' }}>
                    Thank You for Reaching Out!
                </Heading>
                <Text style={{ color: '#555', marginBottom: '20px' }}>
                    I appreciate you {name} for reaching out! Your message has been received, and I&apos;ll get back to you as soon as possible. 
                    If you need immediate assistance, feel free to reply to this email or give me a call at 586-863-3038. I&apos;m looking forward to speaking with you!
                </Text>
                <Button
                    href="https://maliek-davis.com"
                    style={{
                        fontFamily: 'sans-serif',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        padding: '12px 20px',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        border: 'none',
                    }}
                >
                    Visit Maliek-Davis.com
                </Button>
            </div>
        </Html>
    );
}

export default ThanksForContactingMe