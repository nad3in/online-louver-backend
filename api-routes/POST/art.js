const artPieces = require('../../model/artPieces')
const user = require('../../model/user')
module.exports.artPiecesList = async (req, res) => {
    const { number_of_elements, page_number, last_piece_id, user_name } = req.body;

    if (!(number_of_elements && page_number && user_name)) {
        res.status(400).send("All input is required");
    }
    const isExsisitngUser = await user.existingUser(user_name)
    if (!isExsisitngUser || isExsisitngUser.user_role.toLowerCase() !== "admin") {
        res.status(401).send("Unauthorized user");
    }
    const result = await artPieces.getArtPieces(number_of_elements, page_number, last_piece_id);
    return result;
}