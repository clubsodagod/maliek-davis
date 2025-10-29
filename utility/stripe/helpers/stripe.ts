

import Stripe from 'stripe';


if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret not found!')
}


// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
    typescript: true,
});

