const CreateUserRepository = require('../repositories/createUserRepository')

exports.createUserService = async (data) => {
  try {
    const userParam = data;

    const createUser = await CreateUserRepository.createUserRepository(userParam);
    
    return createUser;

  } catch (error) {
    throw error
  }

};