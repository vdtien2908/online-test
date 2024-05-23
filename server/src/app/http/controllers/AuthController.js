class AuthController {
    index(req, res, next) {
        res.send('auth');
    }
}

export default new AuthController();
