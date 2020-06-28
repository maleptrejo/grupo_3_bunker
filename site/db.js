const faker = require('faker');
var bcrypt = require('bcrypt');
const db = require('./database/models')

db.Users.create({
    email: faker.internet.email(),
    password: bcrypt.hashSync('12345678', 10),
    avatar: '1591744954745.jpg',
}, {
    include: ['admins'],
}).then(user => {
    console.log("user", user.null)
})

// let admin = user.setAdmin({
//     user_id : user.id
// })

// console.log("USER", user)
// console.log("ADMIN", admin)

process.exit()