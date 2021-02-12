const { Thought, User } = require('../models'); 

// allow to get all comments or "thoughts"
const thoughtController = { 
    getThoughts(req, res) { 
        Thought.find()
        .sort({ createdAt: -1})
        .then((dbThoughtData) => { 
            res.json(dbThoughtData);
        })
        .catch((err) => { 
            console.log(err); 
            res.status(500).json(err);
        });
    }, 

    // get a single thought with this id ie. can search for an exacact thought with the correct id 
    getSingleThought(req, res) { 
        Thought.findOne({ _id: req.params.thoughtId })
        .then ((dbThoughtData) => { 
            if (!dbThoughtData) { 
                return res.status(404).json({ message: 'not a vaild id'}); 
            }
            res.json(dbThoughtData);
        })
        .catch((err) => { 
            console.log(err); 
            res.status(500).json(err);
        });
    }, 

    // being able to create a thought 
    createThought(req, res) { 
        Thought.create(req.body)
        .then((dbThoughtData) => { 
            return User.findOneAndUpdate(
                { _id: req.body.userId }, 
                { $push: { thoughts: dbThoughtData._id } }, 
                { new: true}
            );
        })
        .then((dbUserData) => { 
            if (!dbUSerData) { 
                return res.status(400).json({ message: 'Please add user id with your thought, thought was created'}); 
            }

            res.json({ message: 'Your thought was created! '}); 


        })

        .catch((err) => { 
            console.log(err); 
            res.status(500).json(err);
        });

    }, 
    // edit your thought or add onto it 
    updateThought(req, res) { 
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body}, { runValidators: true, new: true })
        .then((dbThoughtData) => { 
            if (!dbThoughtData) { 
                return res.status(404).json({ message: 'No ID with this Thought'}); 
            }
            res.json(dbThoughtData); 
        })
        .catch((err) => { 
            console.log(err); 
            res.status(500).json(err);
        });
    }, 

    // delete function / if you want to delete your thought 
    deleteThought(req, res) { 
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => { 
            if (!dbThoughtData) { 
                return res.status(404).json({ message: 'Was not able to delete thought '}); 

            }

            // removing the thought from the users history so it will not show up anywhere 
            return User.findOneAndUpdate( 
                { thoughts: req.params.thoughtId }, 
                { $pull: { thoughts: req.params.thoughtId}}, 
                { new: true}

            ); 
        })
        .then((dbUserData) => { 
            if (!dbUserData) { 
                return res.status(404).json({ message: ' No User with the created Thought'}); 
            } 
            res.json({ message: ' THought was Deleted'});
            
        })
        .catch((err) => { 
            console.log(err); 
            res.status(500).json(err);
        });
    },

    // when you want to add a reaction to your thought 
    addReaction(req, res) { 
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId}, 
            { $addToSet: { reactions: req.body }}, 
            { runValidators: true, new: true}
            
        )
        .then((dbThoughtData) => { 
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'Wrong ID'}); 
            }
            res.json(dbThoughtData);
        })
        .catch((err) => { 
            console.log(err); 
            res.status(500).json(err);
        });
    }, 

    // deleting your reaction to your thought 
    removeReaction(req, res) { 
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => { 
            if (!dbThoughtData) { 
                return res.status(404).json({ message: ' Wrong ID '}); 
            }
            res.json(dbThoughtData);
        })
            .catch((err) => { 
                console.log(err); 
                res.status(500).json(err);
            });
        },
    }; 

    module.exports = thoughtController; 
    


 