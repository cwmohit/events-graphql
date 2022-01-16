const Event = require("../../modals/event");
const User = require("../../modals/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args) => {
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
      createdEvent = transformEvent(res);
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
};
