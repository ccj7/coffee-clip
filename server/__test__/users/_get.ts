import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import connectToDB from '../../db-connection'
import server from '../../app'
import runSeedUser from '../../user/seed'
import usersData from '../../user/users.json'
import mongoose from 'mongoose'

chai.use(chaiHttp)

describe('Users Get Request Tests', () => {
    before(async () => {
        await connectToDB()
        await runSeedUser()
    })

    after(async () => {
        mongoose.connection.close()
    })

    describe('GET Users', () => {
        it('GET /api/users', async () => {
            const res = await chai.request(server).get('/api/users')
            const users = usersData.users
            expect(res.body.length).to.equal(users.length)
        })

        it('GET /api/users/search', async () => {
            const res = await chai
                .request(server)
                .get('/api/users/search')
                .query({ keyword: 'ma' })

            expect(res.body.users.length).to.equal(1)
            expect(res.body.shops.length).to.equal(0)
        })

        it('GET /api/users/search 2', async () => {
            const res = await chai
                .request(server)
                .get('/api/users/search')
                .query({ keyword: 'foo' })

            const expectedData = {
                users: [],
                shops: [],
            }
            expect(res.body).to.deep.equal(expectedData)
        })

        it('GET /api/users/handle/:handleName', async () => {
            const res1 = await chai
                .request(server)
                .get('/api/users/handle/kaori_hikita')

            const res2 = await chai.request(server).get('/api/users/handle/foo')

            expect(res1.body).to.be.true
            expect(res2.body).to.be.false
        })

        it('GET /api/users/:authId', async () => {
            const res = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')
            const userHandleName = usersData.users[0].handle_name
            const userFollowerHandleName =
                usersData.users[0].follower_handle_names

            expect(res.body.handle_name).to.deep.equal(userHandleName)
            expect(res.body.follower_handle_names).to.deep.equal(
                userFollowerHandleName
            )
        })

        it('GET /api/users/:authId/followee/reviews', async () => {
            const res = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/followee/reviews')

            expect(res.body.reviews[0].handle_name).to.equal('bob_brown')
            expect(res.body.reviews[0].review.coffee_name).to.equal(
                'Arasuna Kiyosumiプレミアムコーヒー'
            )
        })

        it('GET /api/users/:authId/followee/shops', async () => {
            const res = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/followee/shops')

            const handleName = usersData.users[0].followee_shops_handle_names[0]
            expect(res.body.followeeShops[0].handle_name).to.equal(handleName)
        })

        it('GET /api/users/:authId/:handleName', async () => {
            const res = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/bob_brown')

            expect(res.body.handle_name).to.equal('bob_brown')
            expect(res.body.follower_handle_names).to.deep.equal([
                'kaori_hikita',
                'alice_white',
            ])
            expect(res.body.is_following).to.equal(true)
        })
    })
})
