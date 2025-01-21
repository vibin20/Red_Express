// pages/api/payment.js
import Stripe from 'stripe';

const stripe = new Stripe('your-secret-key-here'); // Replace with your actual Stripe secret key

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency, card } = req.body;

    try {
      // Create a Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_data: {
          card: {
            number: card.number,
            exp_month: parseInt(card.exp_month, 10),
            exp_year: parseInt(card.exp_year, 10),
            cvc: card.cvc,
          },
        },
        confirm: true, // Automatically confirm the payment
      });

      // Return the Payment Intent details
      res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
      // Handle any errors that occur during payment processing
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    // Handle any request methods that aren't POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
