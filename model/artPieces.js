const fsBase = require('fs');
const fs = fsBase.promises
var artPieces = {};
module.exports.getArtPieces = async (numberOfElements, pageNumber, lastPieceId) => {
    var pieces = await fs.readFile('model/artPiecesData.json', 'utf8');
    artPieces = JSON.parse(pieces);
    var result = [];
    var lastPieceIdIndex = lastPieceId && pageNumber > 1 ? Object.keys(artPieces).indexOf(lastPieceId) + 1 : null
    var startIndex = lastPieceIdIndex ? lastPieceIdIndex : 0
    var endIndex = lastPieceIdIndex ? (lastPieceIdIndex + numberOfElements) : numberOfElements
    result = Object.fromEntries(
        Object.entries(artPieces).slice(startIndex, endIndex)
    );
    return result;
}
module.exports.editArtPiece = async (artist, description, artName, pieceId) => {
    if (Object.keys(artPieces).length === 0) {
        var pieces = await fs.readFile('model/artPiecesData.json', 'utf8');
        artPieces = JSON.parse(pieces);
    }
    if (!artPieces[pieceId]) {
        return;
    }
    artPieces[pieceId] = { artist: artist, description: description, artName: artName, picture: artPieces[pieceId].picture }

    fs.writeFile('model/artPiecesData.json', JSON.stringify(artPieces), function (err) {
        if (err) throw err;
    })
    return artPieces[pieceId];

}
module.exports.deleteArtPiece = async (pieceId) => {
    if (Object.keys(artPieces).length === 0) {
        var pieces = await fs.readFile('model/artPiecesData.json', 'utf8');
        artPieces = JSON.parse(pieces);
    }
    if (!artPieces[pieceId]) {
        return;
    }
    delete artPieces[pieceId];
    fs.writeFile('model/artPiecesData.json', JSON.stringify(artPieces), function (err) {
        if (err) throw err;
    })
    return pieceId

}