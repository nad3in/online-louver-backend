const user = require('../../model/user')
const artPieces = require('../../model/artPieces')
module.exports.editArtPiece = async (req, res) => {
    const { artist, description, art_name, piece_id, user_name } = req.body;
    if (!(artist && description && art_name && piece_id && user_name)) {
        res.status(400).send("All input is required");
    }
    const isExsisitngUser = await user.existingUser(user_name)
    if (!isExsisitngUser || isExsisitngUser.user_role.toLowerCase() !== "admin") {
        res.status(401).send("Unauthorized user");
    }
    var result = await artPieces.editArtPiece(artist, description, art_name, piece_id);
    console.log("edit", result)
    return result;
}