var MasterList = artifacts.require("./Masterlist.sol");


module.exports = function(deployer) {
  deployer.deploy(MasterList);
};
