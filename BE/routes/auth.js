import { Router } from 'express';
const router = Router();

/**
 * @description Validate access token
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {void}
 */
const postValidateToken = async (req, res) => {
  try {
    res.status(200).send('TOKEN VERIFIED 👍🏻');
  } catch (error) {
    res.status(500).send(error);
  }
};

router.post('/validate-token', postValidateToken);

export default router;
