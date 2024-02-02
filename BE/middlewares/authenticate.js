import jwtmod from 'jsonwebtoken';

export default async (req, res, next) => {
  try {
    console.log('================================');
    console.log('== authentication check start ==');
    console.log('================================');
    // 토큰이 없을 경우 401에러와 메시지 전송
    const token = req.headers['x-access-token'];
    if (!token) {
      return res
        .status(401)
        .send('Access Denied, missing authorization token!');
    }

    const publicKey = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;

    const decodedToken = jwtmod.verify(token, publicKey, {
      algorithms: ['RS256'],
    });

    req.roles =
      decodedToken.resource_access[process.env.KEYCLOAK_CLIENT_ID].roles;

    console.log('   TOKEN VERIFIED 👍🏻');
  } catch (error) {
    console.log('   TOKEN INVALID 👎🏻');
    console.log(error);
    next(error);
  } finally {
    console.log('================================');
    console.log('== authentication check e n d ==');
    console.log('================================\n');
    next();
  }
};
