const artPieces = require('../../model/artPieces')
module.exports.deleteArtPiece = async (req, res) => {
    const { id } = req.body;
    if (!(id)) {
        res.status(400).send("All input is required");
    }
    const result = await artPieces.deleteArtPiece(id);
    return result;
}