import chai, { expect } from "chai"
import chaiHttp from 'chai-http'
import connectToDB from "../../db-connection"
import server from "../../app"
import runSeedShop from "../../shop/seed"
import mongoose from "mongoose"
import { shops } from '../../shop/shops.json'

chai.use(chaiHttp)

describe('Shop Get Request Tests', () => {
  before(async () => {
    await connectToDB()
    await runSeedShop()
  })

  after(async () => {
    mongoose.connection.close()
  })

  describe('GET /api/shop/ 配下',() => {

    it('should return all published shops', async () => {
      const res = await chai.request(server).get('/api/shops/')
      const expectedData = shops.filter(shop => shop.publish_state === true)
      expect(res.body.length).to.equal(expectedData.length)
    })

    it('should return the given id shop', async () => {
      const res = await chai.request(server).get('/api/shops/540PJipKIwXZUY422LmC2j3ZlvU2')
      expect(res.body.handle_name).to.equal(shops[0].handle_name)
      expect(res.body.address).to.equal(shops[0].address)
    })

    it('should return the given handle name shop', async () => {
      const res = await chai.request(server).get('/api/shops/details/arasuna')
      expect(res.body.handle_name).to.equal(shops[1].handle_name)
      expect(res.body.address).to.equal(shops[1].address)
    })

    it('should return the given handle name shop with following', async () => {
      const res = await chai.request(server).get('/api/shops/KwXrR15NeFhXUgPbUWfmj03qt0T2/coffeeeeen')
      expect(res.body.handle_name).to.equal('coffeeeeen')
      expect(res.body.is_following).to.be.false
    })

    it('should return the given handle name shop with following', async () => {
      const res = await chai.request(server).get('/api/shops/FTbxuYF3NggkwRjP4f6woEY7RKB2/arasuna')
      expect(res.body.handle_name).to.equal('arasuna')
      expect(res.body.is_following).to.be.true
    })

  })

})