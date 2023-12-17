const listGameById = require('../services/listIdGameService')


exports.listIdGameController = async (req, res) => {
          
  const id = req.params.id;

  try{

    const listGame = await listGameById.listIdGameService(id);

    return res.send(listGame);
        
          
  } catch(error) {
    return res.send(error.message);
  }

}