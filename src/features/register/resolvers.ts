import * as bcrypt from "bcryptjs";

import { GQL, ResolverMap } from "../../types";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    registration: () => "allowed"
  },

  Mutation: {
    register: async (
      _,
      { userName, email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create({
          username: userName,
          email,
          password: hashedPassword
        });

        await user.save();
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
