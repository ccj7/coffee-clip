import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import connectToDB from '../../db-connection'
import server from '../../app'
import mongoose from 'mongoose'
import runSeedUser from '../../user/seed'

chai.use(chaiHttp)

describe('Users Post Request Tests', () => {
    before(async () => {
        await connectToDB()
        await runSeedUser()
    })

    after(async () => {
        mongoose.connection.close()
    })

    describe('Post Users', () => {
        it('POST /api/users', async () => {
            const beforeUsers = await chai.request(server).get('/api/users')

            const newUser = {
                auth_id: 'TEST_ID',
                handle_name: 'TEST_USER',
                display_name: 'TEST',
                icon: '',
            }

            const res = await chai
                .request(server)
                .post('/api/users')
                .send(newUser)

            const afterUsers = await chai.request(server).get('/api/users')

            expect(res.status).to.equal(200)
            expect(afterUsers.body.length).to.equal(beforeUsers.body.length + 1)
        })

        it('POST /api/users 2', async () => {
            const beforeUsers = await chai.request(server).get('/api/users')

            const newUser = {
                auth_id: 'TEST_ID2',
                handle_name: 'kaori_hikita',
                display_name: 'TEST2',
                icon: '',
            }

            const res = await chai
                .request(server)
                .post('/api/users')
                .send(newUser)

            const afterUsers = await chai.request(server).get('/api/users')

            expect(res.status).to.equal(400)
            expect(afterUsers.body.length).to.equal(beforeUsers.body.length)
        })

        it('POST /api/users/:authId/reviews', async () => {
            const beforeUser = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')

            const newReview = {
                image: '',
                description: 'test comment',
            }

            const res = await chai
                .request(server)
                .post('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/reviews')
                .send(newReview)

            const res2 = await chai
                .request(server)
                .post('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/reviews')
                .send(newReview)

            const afterUser = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')

            expect(res.status).to.equal(200)
            expect(res2.status).to.equal(200)
            expect(afterUser.body.reviews.length).to.equal(
                beforeUser.body.reviews.length + 2
            )
        })

        it('POST /api/users/:authId/reviews 2', async () => {
            const res = await chai
                .request(server)
                .post('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/reviews')
                .send({})

            const newReview = {
                image: '',
                description: 'test comment',
            }

            const res2 = await chai
                .request(server)
                .post('/api/users/TestId/reviews')
                .send(newReview)

            expect(res.status).to.equal(400)
        })
    })
})
