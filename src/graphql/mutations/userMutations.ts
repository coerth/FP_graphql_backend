import User from '../../mongoose/models/User';
import { Request } from 'express';

const userMutations = {
  createUser: async (_: any, { sub, email, name }: { sub: string; email: string; name: string }) => {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        sub,
        email,
        name,
        nickname: name, // Assuming nickname is the same as name initially
        timestamp: new Date().toISOString(), // Set timestamp to current date and time
      });
      await user.save();
    }
    return user;
  },
  updateUser: async (_: any, { name, nickname }: { name: string; nickname: string }, { req }: { req: Request }) => {
    const id = req.user?._id;

    if (!id) {
      throw new Error('Unauthorized');
    }

    const user = await User
      .findByIdAndUpdate(id, { name, nickname }, { new: true });
    return user;
  },
};

export default userMutations;