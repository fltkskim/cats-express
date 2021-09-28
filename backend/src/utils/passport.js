const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const { findCatByIdWithoutPassword } = require('../models/cats')
require('dotenv').config()

exports.jwtPassport = (passport) => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }

  passport.use(
    new JWTStrategy(jwtOptions, async (payload, done) => {
      try {
        const cat = await findCatByIdWithoutPassword(payload.sub)
        if (cat) {
          return done(null, cat)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    })
  )
}
