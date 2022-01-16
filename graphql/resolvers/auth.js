const bcrypt = require("bcryptjs");
const User = require("../../modals/user");

module.exports = {
  createUser: async (args) => {
    try {
      const user = await User.findOne({ email: args.userInput.email });
      if (user) {
        throw new Error("User already exists.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const NewUser = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const res = await NewUser.save();
      console.log(res);
      return { ...res._doc, password: null, _id: res.id };
    } catch (error) {
      throw error;
    }
  },
};
