const { User, Thought } = require('../models'); 

// allow the application to get all users ( ie.everybody)
const  userController = { 
    getUsers(req, res) { 
        User.find()
        .select('__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => { 
            console.log(err); 
            res.status(500).json(err);
        }); 
    },
    // allow to get a single user with their username 
    getSingleUser(req,res) { 
        User.findOne({_id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => { 
            if(!dbUserData) {
                return res.status(404).json({message: 'Incorrect Username'}); 
            }
            res.json(dbUserData);
        })
        .catch(err => { 
            console.log(err);
            res.status(500).json(err);
        });
    },

    //to create a new username or user ( Like FB when you want to create a new account)

    createUser(req, res) { 
        User.create(req.body)
        .then((dbUserData) => { 
            res.json(dbUserData);
        })
        .catch((err) => { 
            console.log(err); 
            res.status(500).json(err);

        });
    }, 

    // when you want to update your username ie. bbencich to briebencich
    updateUSer(req,res) { 
        User.findOneAndUpdate( 
            { _id: req.paramsuserId }, 
            { 
                $set: req.body,
            },
            { 
                runValidators: true, 
                new: true, 
            }
        )
        .then((dbUserData) => { 
            if (!dbUserData) { 
                return res.status(404).json({ messgae: ' Not a username'});
            }
            res.json(dbUserData);
        })
        .catch((err) => { 
            console.long(err); 
            res.status(500).json(err);
        }); 
    },

}; 


    module.exports = userController; 

