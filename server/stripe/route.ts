import { Router } from 'express'
import { Request, Response } from 'express'
require('dotenv').config()

const routes = Router()
const Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

routes.post('/checkout_sessions', async (req: Request, res: Response) => {
    try {
        const session = await Stripe.checkout.sessions.create({
            line_items: [
                {
                    price: req.body.price_ID,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/user/payment-success?success=true`,
            cancel_url: `${req.headers.origin}/user/onlineShop?canceled=true`,
        })
        res.redirect(303, session.url)
    } catch (err: any) {
        res.status(err.statusCode || 500).json(err.message)
    }
})

export default routes
