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
        it('PUT /api/users/:authId', async () => {
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

        it('PUT /api/users/:authId/users/following', async () => {
            const addFollowee = {
                handle_name: 'taro_yamada',
            }

            await chai
                .request(server)
                .put('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/users/following')
                .send(addFollowee)

            const afterUser = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')

            const afterFollowee = await chai
                .request(server)
                .get('/api/users/OMEv4PkUyWXsDBtPYp15Da1ihjr2')

            expect(afterUser.body.followee_handle_names).to.include.members([
                'taro_yamada',
            ])

            expect(afterFollowee.body.follower_handle_names).to.include.members(
                ['kaori_hikita']
            )
        })

        it('PUT /api/users/:authId/users/unfollowing', async () => {
            const removeFollowee = {
                handle_name: 'bob',
            }

            await chai
                .request(server)
                .put(
                    '/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/users/unfollowing'
                )
                .send(removeFollowee)

            const afterUser = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')

            const afterFollower = await chai
                .request(server)
                .get('/api/users/FTbxuYF3NggkwRjP4f6woEY7RKB2')

            expect(afterUser.body.followee_handle_names).to.not.have.members([
                'bob',
            ])

            expect(
                afterFollower.body.follower_handle_names
            ).to.not.have.members(['kaori_hikita'])
        })

        it('PUT /api/users/:authId/shops/following', async () => {
            const addFollowee = {
                handle_name: 'amazing_coffee',
            }

            await chai
                .request(server)
                .put('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2/shops/following')
                .send(addFollowee)

            const afterUser = await chai
                .request(server)
                .get('/api/users/h1ERSr4qUNUoviCQlzZ0648p1cA2')

            const afterFollower = await chai
                .request(server)
                .get('/api/shops/4E5Jby73IVRAypSDyV3IfFcQwXz5')

            expect(
                afterUser.body.followee_shops_handle_names
            ).to.include.members(['amazing_coffee'])

            expect(afterFollower.body.follower_handle_name).to.include.members([
                'kaori_hikita',
            ])
        })
    })
})
