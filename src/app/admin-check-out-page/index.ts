import * as functions from 'firebase-functions';

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz');


export const createCheckoutSession1 = functions.https.onCall(async (data, context) => {
  const { product_name, unit_amount, quantity } = data;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product_name // this name will show up in your client side checkout session as the item the user is buying
          },
          unit_amount: unit_amount * 100 // the amount for the product multiplied by 100 ($5.34 is represented as 534)
        },
        quantity // a number representing the amount of the product_name your user is buying. This will be multiplied by the price to get the total cost for the user.
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:4200/admincheckoutpage?' +
                 'session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:4200/admincheckoutpage'
  });
  return session.id;
});