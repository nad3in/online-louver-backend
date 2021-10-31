const User = require("../../model/user");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
module.exports.AddUser = async (req, res) => {
    const { user_name, user_role, password, user_phone_number } = req.body;

    if (!(user_name && password && user_role && user_phone_number)) {
        res.status(400).send("All input is required");
    }
    const oldUser = await User.existingUser(user_name);
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = User.addUser({ user_name: user_name, user_role: user_role, password: encryptedPassword, user_phone_number: user_phone_number });
    return { user_name: user.user_name, user_role: user.user_role };
}
module.exports.Login = async (req, res) => {
    const { user_name, password } = req.body;
    if (!(user_name && password)) {
        res.status(400).send("All input is required");
    }
    const user = await User.existingUser(user_name);
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { user_id: user._id, user_name },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3d",
            }
        );
        user.token = token;
        res.status(200).json({ token: user.token, user_name: user.user_name, user_role: user.user_role });
    }
    res.status(400).send("Invalid Credentials");
}