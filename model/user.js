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
module.exports.getUsers = async (numberOfElements, pageNumber, lastId) => {
    var users = await fs.readFile('model/usersData.json', 'utf8');
    currentUsers = JSON.parse(users);
    var result = [];
    var lastPieceIdIndex = lastId && pageNumber > 1 ? Object.keys(currentUsers).indexOf(lastId) + 1 : null
    var startIndex = lastPieceIdIndex ? lastPieceIdIndex : 0
    var endIndex = lastPieceIdIndex ? (lastPieceIdIndex + numberOfElements) : numberOfElements
    result = Object.fromEntries(Object.entries(currentUsers).slice(startIndex, endIndex).map(user => { return [user[0], { id: user[1].id, "userName": user[1]["user_name"], "phoneNumber": user[1]["user_phone_number"] }] }));
    return result;
}
