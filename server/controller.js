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
            email: createdUser.email,
            firstName: createdUser.first_name,
            lastName: createdUser.last_name,
            userImg: createdUser.user_img
        };
        res.status(200).send({ user: req.session.user, session: true })
    },
    async login(req, res) {
        let { email, password } = req.body;
        let db = req.app.get('db');
        let [foundUser] = await db.find_user([email]);
        if (foundUser) {
            let result = bcrypt.compareSync(password, foundUser.hash)
            if (result) {
                req.session.user = {
                    userID: foundUser.id,
                    email: foundUser.email,
                    firstName: foundUser.first_name,
                    lastName: foundUser.last_name,
                    userImg: foundUser.user_img
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
        res.status(200).send(updateUserImg.user_img)
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
        res.status(200).send(updateUserEmail.email)
    },
    async deleteUser(req, res) {
        const { id } = req.params.id
        let db = req.app.get('db')
        let [deleteUser] = await db.delete_user([id]);
        res.status(200).send({ user: {}, session: false })
    },
    async addProduct(req, res) {
        const { productName, companyName, companyUrl, productImg, user } = req.body
        let db = req.app.get('db')
        let foundProduct = await db.find_product([productName]);
        
        if (foundProduct[0]) return res.status(200).send({messsage: 'This product has already been added'})
        // let [createdProduct] =
            await db.create_product([productName, companyName, companyUrl, productImg, user])
        // let newProduct = {
        //     productName: createdProduct.product_name,
        //     companyName: createdProduct.company_name,
        //     companyUrl: createdProduct.company_website,
        //     productImg: createdProduct.product_img,
        //     createdBy: createdProduct.created_by
        // }
        res.sendStatus(200)
    },
    async getProducts(req, res) {
        let db = req.app.get('db')
        let allProducts = await db.get_products();
        // console.log(allProducts)
        res.status(200).send(allProducts)
    },
    async voteUp(req, res) {
        console.log('api working')
        let db = req.app.get('db')
        let allProducts = await db.vote_up(req.body.id)
        res.status(200).send(allProducts)
    }
}