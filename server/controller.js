const bcrypt = require('bcryptjs');

module.exports = {
    async signup(req, res) {
        let { email, password } = req.body;
        let db = req.app.get('db')
        let foundUser = await db.find_user([email]);
        if (foundUser[0]) return res.status(200).send({ message: 'Email already in use' })
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let [createdUser] = await db.create_user([email, hash]);
        req.session.user = { email: createdUser.user_email };
        res.status(200).send(req.session.user)
    },
    async login(req, res) {
        let { email, password } = req.body;
        let db = req.app.get('db');
        let [foundUser] = await db.find_user([email]);
        if (foundUser) {
            let result = bcrypt.compareSync(password, foundUser.user_hash)
            if (result) {
                req.session.user = { email: foundUser.user_email };
                res.status(200).send(req.session.user)
            } else {
                res.status(401).send('Incorrect password.' )
            }
        } else {

            res.status(401).send( 'Email not found.' )
        }
    },
    logout(req, res) {
        req.session.destroy();
        res.status(200).send('')
    },
    sessionCheck(req, res) {
        if (req.session.user) {
            return res.status(200).send(req.session.user)
        } else {
            res.status(401).send('No active session')
        }
    }
}