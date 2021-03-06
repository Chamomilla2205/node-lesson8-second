const authService = require('../service/auth.service');
const { tokenizer } = require('../helpers');

module.exports = {
    enterToAccount: async (req, res) => {
        try {
            const { profile } = req;

            const tokens = tokenizer();

            await authService.newToken(tokens, profile.id);

            res.json(tokens);
        } catch (err) {
            res.json(err.message);
        }
    },

    getNewTokens: async (req, res) => {
        try {
            const { tokens: { _id, _user_id } } = req;

            const tokens = tokenizer();

            await authService.deleteToken(_id);

            await authService.addNewToken(tokens, _user_id);

            res.json(tokens);
        } catch (err) {

        }
    }
};
