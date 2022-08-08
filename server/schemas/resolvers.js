const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("savedBooks");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    //login credentials validation
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }

      const token = signToken(user);
      return { user, token };
    },

    //add user to the system
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    //code to save book to user profile
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const newBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedBooks: {
                description: args.description,
                authors: args.authors,
                bookId: args.bookId,
                title: args.title,
                image: args.image
              },
            },
          },
          { new: true },
        );
        return newBook;
      }
      throw new AuthenticationError('User not found');
    },

    //function to delete book from user profile
    deleteBook: async (parent, { bookId }, context) => {
      console.log('***in deletebook', bookId);

      if (context.user) {
        const removedBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        )
        return (removedBook);
      }
      throw new AuthenticationError('User not found');
    },

  }

};

module.exports = resolvers;