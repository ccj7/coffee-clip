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

    describe('Put Users', () => {
        it('PUT /api/users', async () => {
            const beforeUsers = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')

            const updateUser = {
                display_name: 'KAORI TEST',
            }

            await chai
                .request(server)
                .put('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')
                .send(updateUser)

            const afterUsers = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')

            expect(beforeUsers.body.display_name).to.equal('Kaori')
            expect(beforeUsers.body.icon).not.to.equal('')
            expect(afterUsers.body.display_name).to.equal(
                updateUser.display_name
            )
        })
    })
})
