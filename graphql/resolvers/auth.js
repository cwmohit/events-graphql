const bcrypt = require("bcryptjs");
const User = require("../../modals/user");
const jwt = require("jsonwebtoken");

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
  login: async ({email, password}) => {
    const user = await User.findOne({email: email});
    if(!user){
       throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual){
        throw new Error('Password does not exist!');
    }
    const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
        expiresIn: '1h'
    });
    return {
        userId: user.id,
        token: token,
        tokenExpiration: 1
    }
  }
};
