const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
  
} = require("../../controllers/user-controllers");

router.route("/").get(getAllUsers).post(createUser);


router.route("/:UserId").get(getUserById).put(updateUser).delete(deleteUser);


router.route("/:UserId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router