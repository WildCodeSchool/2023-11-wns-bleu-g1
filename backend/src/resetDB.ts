import db from "./db";
import User from "./entities/user";

const cleanDb = async () => {
  console.log(db.entityMetadatas);
  const runner = db.createQueryRunner();

  await runner.query('DROP TABLE IF EXISTS "public.user"');
};

const main = async () => {
  await db.initialize();

  await cleanDb();

  const user = await User.create({ email: "test@test.test" }).save();

  console.log(`${user.email} created`);
};

main();
