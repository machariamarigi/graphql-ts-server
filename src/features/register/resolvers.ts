import { FatalError } from "./../../utils/fatalError";
import * as bcrypt from "bcryptjs";

import { GQL, ResolverMap } from "../../types";
import { User } from "../../entity/User";
import { EmailUsedError } from "./errors";

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

        const emailAlreadyExits = await User.findOne({
          where: { email },
          select: ["id"]
        });

        if (emailAlreadyExits) {
          throw new EmailUsedError();
        }

        await user.save();
        return true;
      } catch (error) {
        if (error.path) {
          throw new FatalError({ data: { reason: error.message } });
        } else {
          throw error;
        }
      }
    }
  }
};
