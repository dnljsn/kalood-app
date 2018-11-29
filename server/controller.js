const bcrypt = require('bcryptjs');
const aws = require('aws-sdk');

module.exports = {
    async signup(req, res) {
        let { email, password } = req.body;
        let db = req.app.get('db')
        let foundUser = await db.find_user([email]);
        if (foundUser[0]) return res.status(200).send({ message: 'Email already in use' })
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let [createdUser] = await db.create_user([email, hash]);
        req.session.user = {
            userID: createdUser.id,
            email: createdUser.user_email,
            firstName: createdUser.first_name,
            lastName: createdUser.last_name,
            userImg: createdUser.profile_pic
        };
        res.status(200).send({ user: req.session.user, session: true })
    },
    async login(req, res) {
        let { email, password } = req.body;
        let db = req.app.get('db');
        let [foundUser] = await db.find_user([email]);
        if (foundUser) {
            let result = bcrypt.compareSync(password, foundUser.user_hash)
            if (result) {
                req.session.user = {
                    userID: foundUser.id,
                    email: foundUser.user_email,
                    firstName: foundUser.first_name,
                    lastName: foundUser.last_name,
                    userImg: foundUser.profile_pic
                };
                res.status(200).send({ user: req.session.user, session: true })
            } else {
                res.status(401).send('Incorrect password.')
            }
        } else {

            res.status(401).send('Email not found.')
        }
    },
    logout(req, res) {
        req.session.destroy();
        res.status(200).send({ user: {}, session: false })
    },
    sessionCheck(req, res) {
        if (req.session.user) {
            return res.status(200).send({ user: req.session.user, session: true })
        } else {
            res.status(401).send('No active session')
        }
    },
    signURL(req, res) {
        const {
            S3_BUCKET,
            AWS_ACCESS_KEY_ID,
            AWS_SECRET_ACCESS_KEY
        } = process.env
        aws.config = {
            region: 'us-west-1',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }

        const s3 = new aws.S3();
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        }
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
            };

            return res.send(returnData)
        });
    },
    async updateUserImg(req, res) {
        const { url } = req.body
        const { userID } = req.session.user
        let db = req.app.get('db')
        let [updateUserImg] = await db.update_user_img([url, userID]);
        res.status(200).send(updateUserImg.profile_pic)
    },
    async updateUserInfo(req, res) {
        const { firstName, lastName } = req.body
        const { userID } = req.session.user
        let db = req.app.get('db')
        let [updateUserInfo] = await db.update_user_info([firstName, lastName, userID]);
        res.status(200).send({
            firstName: updateUserInfo.first_name,
            lastName: updateUserInfo.last_name
        })
    },
    async updateUserEmail(req, res) {
        const { newEmail } = req.body
        const { userID } = req.session.user
        let db = req.app.get('db')
        let [updateUserEmail] = await db.update_user_email([newEmail, userID]);
        res.status(200).send(updateUserEmail.user_email)
    }
}