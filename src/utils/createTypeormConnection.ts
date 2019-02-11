import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeormConnection = async () => {
  try {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection({ ...connectionOptions, name: "default" });
  } catch(error) {
    return error;
  }
};
