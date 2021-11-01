const fsBase = require('fs');
const fs = fsBase.promises
var currentUsers = {};
module.exports.existingUser = async (userInfo) => {
    var users = await fs.readFile('model/usersData.json', 'utf8');
    currentUsers = JSON.parse(users);
    var currentUser = Object.keys(currentUsers).find(key => key == userInfo)
    return currentUser ? currentUsers[currentUser] : null
}
module.exports.addUser = (userData) => {
    const { v4: uuidv4 } = require('uuid');
    if (currentUsers) {
        const newUser = { id: uuidv4(), ...userData };
        currentUsers[userData.user_name] = { id: uuidv4(), ...userData }
        fs.writeFile('model/usersData.json', JSON.stringify(currentUsers), function (err) {
            if (err) throw err;
        })
        return newUser
    }

}