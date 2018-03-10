import { GraphQLString, GraphQLList } from 'graphql';
import keystone from 'keystone';
import UserType from './type';

const User = keystone.list('User').model;

const user = {
  type: UserType,
  args: {
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve: (root, args, { UserLoader }) => UserLoader.load(args._id),
};

const users = {
  type: new GraphQLList(UserType),
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  resolve: (root, args) => User.find(args).then(result => result),
};

export default {
  user,
  users,
};
