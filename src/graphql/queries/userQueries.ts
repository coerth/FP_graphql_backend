import User from '../../mongoose/models/User';

const userQueries = {
  user: async (_: any, { sub }: { sub: string }) => {
    return await User.findOne({ sub });
  },
};

export default userQueries;