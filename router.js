const Express = require('express');
const userRouter = require('./Controller/user.route');

const router = Express.Router();

router.use('/users', userRouter);

module.exports = router;