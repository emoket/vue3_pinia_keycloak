export default async (req, res, next) => {
  try {
    console.log('=======================');
    console.log('== admin check start ==');
    console.log('=======================');
    console.log(`${req.roles}`);

    // ADMIN 일 경우 request headers에 isAdmin 값을 추가
    req.isAdmin = req.roles.includes('ob-admin') ? true : false;
    console.log(`   You're ADMIN 👍🏻`);
  } catch (error) {
    console.log(`   You're NOT ADMIN 👎🏻`);
    next(error);
  } finally {
    console.log('=======================');
    console.log('== admin check e n d ==');
    console.log('=======================\n');
    next();
  }
};
