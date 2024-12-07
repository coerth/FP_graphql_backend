import User from '../../mongoose/models/User';

const userQueries = {
  user: async (_: any, __: any, context: { req: any }) => {
    const user = context.req.user;
    if (!user) {
      throw new Error('Unauthorized');
    }
    const { sub } = user;
    return await User.findOne({ sub });
  },
};

export default userQueries;