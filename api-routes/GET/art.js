const artPieces = require('../../model/artPieces')
module.exports.getArtPieces = async (req, res) => {
    const { number_of_elements, page_number, last_piece_id } = req.query;
    if (!(number_of_elements && page_number)) {
        res.status(400).send("All input is required");
    }
    const result = await artPieces.getArtPieces(number_of_elements, page_number, last_piece_id);
    return result;
}