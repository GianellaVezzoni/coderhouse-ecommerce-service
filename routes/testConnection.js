import express from 'express';
const router = express.Router();

router.get('/ping', async (req, res) => {
  await res.json({ message: 'pong' }).status(200);
});

export default router;