const users = require('../../model/user')
module.exports.getUsers = async (req, res) => {
    const { number_of_elements, page_number, last_id } = req.query;
    if (!(number_of_elements && page_number)) {
        res.status(400).send("All input is required");
    }
    const result = await users.getUsers(number_of_elements, page_number, last_id);
    return result;
}