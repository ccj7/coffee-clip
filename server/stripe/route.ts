import { Router } from 'express'
import { Request, Response } from 'express'
require('dotenv').config()

const routes = Router()

// app.use(express.static('public'))

const YOUR_DOMAIN =
    'http://ec2-18-183-145-70.ap-northeast-1.compute.amazonaws.com/'

const Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

routes.post('/api/test', async (req: Request, res: Response) => {
    const account = await Stripe.accounts.create({ type: 'standard' })

    const accountLink = await Stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${YOUR_DOMAIN}`,
        return_url: `${YOUR_DOMAIN}`,
        type: 'account_onboarding',
    })

    res.json(accountLink.url)
})

routes.post('/checkout_sessions', async (req, res) => {
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
