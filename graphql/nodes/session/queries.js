import { GraphQLString, GraphQLList } from 'graphql';
import keystone from 'keystone';
import SessionType from './type';

const Session = keystone.list('Session').model;

const session = {
  type: SessionType,
  args: {
    _id: { type: GraphQLString },
  },
  resolve: (root, args, { SessionLoader }) => SessionLoader.load(args._id),
};

const sessions = {
  type: new GraphQLList(SessionType),
  args: {},
  resolve: (root, args) => Session.find(args).then(result => result),
};

export default {
  session,
  sessions,
};
