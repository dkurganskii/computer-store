const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
    const { name, email } = req.user;

    const user = await User.findOneAndUpdate(
        { email },
        { name },
        { new: true }
    );
    if (user) {
        console.log("USER UPDATED", user);
        res.json(user);
    } else {
        const newUser = await new User({
            email,
            name
            // name: req.user.email.split('@')[0],

        }).save();
        console.log("USER CREATED", newUser);
        res.json(newUser);
    }
};
