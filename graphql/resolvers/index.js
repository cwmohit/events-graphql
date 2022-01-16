const bcrypt = require("bcryptjs");
const Event = require("../../modals/event");
const User = require("../../modals/user");

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator),
      };
    });
  } catch (error) {
    throw error;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args) => {
    // const event = {
    //   _id: Math.random().toString(),
    //   title: args.eventInput.title,
    //   description: args.eventInput.description,
    //   price: +args.eventInput.price,
    //   date: args.eventInput.date,
    // };
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "61e2f5eb3706be63e5a36b2e",
    });
    let createdEvent;
    try {
      const res = await event.save();
      createdEvent = {
        ...res._doc,
        _id: res._doc._id.toString(),
        date: new Date(res._doc.date).toISOString(),
        creator: user.bind(this, res._doc.creator),
      };
      const creator = await User.findById("61e2f5eb3706be63e5a36b2e");
      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (error) {
      throw error;
    }
  },
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
