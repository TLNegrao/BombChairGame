const createUserSchema = require('../models/account');

exports.createUserRepository = async (data) => {
   try{
        const createUser = new createUserSchema({
            nonce: data.nonce,
            address: data.address,
            privateKey: data.privateKey,
        });
        const saveUser = await createUser.save();
        return saveUser;
    } catch(error) {
        throw error
    }
}