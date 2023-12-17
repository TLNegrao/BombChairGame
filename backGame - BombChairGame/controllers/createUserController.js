const createUser = require("../services/createUserService");

exports.createUserController = async (req, res) => {

  
  try {  
    
    const userParam = req.body;
    const saveAtDataBase = await createUser.createUserService(userParam);
    
    return res.send(saveAtDataBase);

  } catch (error) {

    return res.status(400).send(error.message); 
  } 

  

}