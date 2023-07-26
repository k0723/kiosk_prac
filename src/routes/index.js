import express from 'express';
import itemRouter from './item'
// import postsRouter from './post';
// import userRouter from './user';
// import commentsRouter from './comment';
// import likeRouter from './like';

const router = express.Router();

router.use('/item', itemRouter);
// router.use('/user', userRouter);
// router.use('/comment', commentsRouter);
// router.use('/like', likeRouter);

module.exports = router;
