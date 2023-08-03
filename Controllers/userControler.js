const User = require("../Models/User")

exports.myAccount = async (req, res) => {
   try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json("not found")
      res.json({ user })
   } catch (error) {
      res.json({ message: error.message })
   }
} 


exports.getAllUsers = async (req, res) => {
   try {
      const userCounts = await User.countDocuments()
      const users = await User.find()
      if (!users) return res.status(404).json({ message: "Not Found" })
      res.json({users, userCounts})
   } catch (error) {
      res.json({ message: error.message })
   }
}

exports.deleteUser = async (req, res) => {
   try {
      const user = await User.findById(req.params.id)
      if (!user) return res.status(404).json({ message: "User Not Found" })
      await User.findByIdAndDelete(user.id)
      res.json({ message: "delete Successfully" })
   } catch (error) {
      res.json({ message: error.message })
   }
}



exports.getUser = async (req, res) => {
   try {
       const user = await User.findById(req.params.id)
       if (!user) return res.status(404).json("not found")
       res.json({ user })
   } catch (error) {
       res.json({ message: error.message })
   }
}