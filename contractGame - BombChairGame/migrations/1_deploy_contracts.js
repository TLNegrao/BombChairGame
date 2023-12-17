const BombChairGame = artifacts.require("BombChairGame");

module.exports = function(deployer) {
  deployer.deploy(BombChairGame);
};