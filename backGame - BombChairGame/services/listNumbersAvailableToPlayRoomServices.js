const listAvailableNumbersByRoom = require("../repositories/listNumbersAvailableToPlayRoomRepository");

exports.listAvailableNumbersService = async (data) => {
  try {
    const availableNumbers = await listAvailableNumbersByRoom.availableListNumbersGameRepository(data);

    return availableNumbers;
  } catch (error) {
    throw error;
  }
};