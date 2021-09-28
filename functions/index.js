const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.stripeCheckout = functions.https.onCall(async (data, context) => {
    var productname = data['productname'];
    var amount1 = data['amount'];
    var companyname = data['compname'];
    var quantity = data['quantity'];
    var category = data['category'];
    var trackingnumber = data['trackingnumber'];
    console.log(data);
    
    const stripe = require('stripe')('sk_test_51JWyo0FAyW0TeHuLLaQBBHtLZcYziVNyr2pnSFjDJou1SRlLJOtUHw8kBEJZp8ud7CzgR4jTf8umO1aGafh24dvp00rk4I3z4a')

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: productname,
            description: `Company Name: ${companyname}`,
            amount: amount1*100,                // round to the nearest whole number so we don't have float errors
            currency: 'myr',
            quantity:quantity
        }],
        payment_intent_data:{receipt_email:'oscarchuaweiwen.personal@gmail.com'},
        mode: 'payment',
        success_url: 'http://localhost:4200/adminpage?action=success'+ `&productname=${productname}&amount=${amount1}&compname=${companyname}&quantity=${quantity}&category=${category}&trackingnumber=${trackingnumber}`,
        cancel_url: 'http://localhost:4200/adminpage?action=cancel'+ `&productname=${productname}&amount=${amount1}&compname=${companyname}&quantity=${quantity}&category=${category}&trackingnumber=${trackingnumber}`
    });

    return session.id;
})


exports.retrievePayment = functions.https.onCall(async (data, context) => {
    var name = data['name'];
    console.log(data);
    
    const stripe = require('stripe')('sk_test_51JWyo0FAyW0TeHuLLaQBBHtLZcYziVNyr2pnSFjDJou1SRlLJOtUHw8kBEJZp8ud7CzgR4jTf8umO1aGafh24dvp00rk4I3z4a')

    const paymentIntent = await stripe.paymentIntents.retrieve(
        name
      );

    return paymentIntent;
})

exports.retrieveSession = functions.https.onCall(async (data, context) => {
    var name = data['name'];
    console.log(data);
    
    const stripe = require('stripe')('sk_test_51JWyo0FAyW0TeHuLLaQBBHtLZcYziVNyr2pnSFjDJou1SRlLJOtUHw8kBEJZp8ud7CzgR4jTf8umO1aGafh24dvp00rk4I3z4a')

    const paymentSession = await stripe.checkout.sessions.retrieve(
        name
      );

    return paymentSession;
})


exports.receipt = functions.https.onCall(async (data, context) => {
    var name = data['name'];
    console.log(data);
    
    const stripe = require('stripe')('sk_test_51JWyo0FAyW0TeHuLLaQBBHtLZcYziVNyr2pnSFjDJou1SRlLJOtUHw8kBEJZp8ud7CzgR4jTf8umO1aGafh24dvp00rk4I3z4a')

    const paymentIntent = await stripe.paymentIntents.update(
        'pi_3JY9WGFAyW0TeHuL0dxtLWk5',
        {receipt_email: "oscarchuaweiwen.personal@gmail.com"}
      );

    return paymentIntent;
})

exports.cancelPayment = functions.https.onCall(async (data, context)=>{
    var uid = data['uid']

    const stripe = require('stripe')('sk_test_51JWyo0FAyW0TeHuLLaQBBHtLZcYziVNyr2pnSFjDJou1SRlLJOtUHw8kBEJZp8ud7CzgR4jTf8umO1aGafh24dvp00rk4I3z4a');

const session = await stripe.checkout.sessions.retrieve(
    uid
);

    let paymentID = session.payment_intent;

    const paymentIntent = await stripe.paymentIntents.cancel(
        paymentID
      );

    return paymentIntent;
})
