let key = require('./../config/keys');
let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//  配置secretOrKey
opts.secretOrKey = key.secretOrKey;
let User = require('./../models/users');

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
            .catch(err => console.log(err))
    }));
};