const listAvailableNumbersByRoom = require("../services/listNumbersAvailableToPlayRoomServices");

exports.listOfAvailableRoomNumbersController = async (req, res) => {
  const id = req.params.id;

  try {
    const listOfAvailablNumbers =
      await listAvailableNumbersByRoom.listAvailableNumbersService(id);

    return res.send(listOfAvailablNumbers);
  } catch (error) {
    return res.send(error.message);
  }
};
