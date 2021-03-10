const errorMessage = require('../error/error.messages');
const errorCodes = require('../constants/error.codes');
const { emailActionsEnum } = require('../constants');
const { passHash } = require('../helpers');
const { userService, mailService } = require('../service');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await userService.findUserById(userId);

            res.json(user);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    addNewUser: async (req, res) => {
        try {
            const { preferLanguage = 'en' } = req.query;
            const { password, email } = req.body;

            const hashPassword = await passHash.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            await mailService.sendEmail(email, emailActionsEnum.USER_CREATED, { userName: email });

            res.status(errorCodes.CREATED).json(errorMessage.USER_CREATED[preferLanguage]);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const { preferLanguage = 'en' } = req.query;

            if (userId !== req.user.id) {
                throw new Error('Unauthorized');
            }
            const { email, name } = await userService.findUserById(userId);

            await mailService.sendEmail(email, emailActionsEnum.USER_DELETED, { username: name });

            await userService.deleteUserById(userId);

            res.json(errorMessage.USER_DELETED[preferLanguage]);
        } catch (err) {
            res.status(errorCodes.BAD_REQUEST).json(err.message);
        }
    }
};
