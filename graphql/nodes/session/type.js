import { GraphQLObjectType, GraphQLString } from 'graphql';

const SessionType = new GraphQLObjectType({
  name: 'session',
  fields: () => ({
    _id: { type: GraphQLString },
  }),
});

export default SessionType;
