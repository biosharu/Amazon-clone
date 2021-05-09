const functions = require("firebase-functions");
const express = require('express');
const cors = require("cors");
const stripe = require("stripe")('sk_test_51IXNFfGsdsz8eGMeE5A02pXYocBvjdX2NxCKGRiuUzysmr4MLXIFCXlXH8D17zL7631PPm2ZJHAG2zUIRfMHHDhl00XGg2nRj6');

//API

//App config
const app = express();

//MiddleWare
app.use(cors({origin: true}));
app.use(express.json());

//API routes
app.get('/', (request, response) => response.status(200).send('Hello world!123'));


app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Received BOOM!! >>> ', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of currency
        currency: "usd",
    });
    //OK Create
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

})
//Listen command
exports.api = functions.https.onRequest(app);

//Example Endpoint
//http://localhost:5001/clone-983ae/us-central1/api




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
