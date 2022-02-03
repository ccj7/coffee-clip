import express from 'express'
import shopRoute from './shop/route'
import userRoute from './user/route'
import stripeRoute from './stripe/route'

const app: express.Express = express()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb' }))

app.use('/api/shops', shopRoute)
app.use('/api/users', userRoute)
app.use('/api/stripe', stripeRoute)

export default app
