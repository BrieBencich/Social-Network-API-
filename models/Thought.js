const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction'); 
const dateFormat = require('../utils/dateFormat'); 


//for setup and to creat your time stamp ie. date allowing to leave messages 

const thoughtSchema = new Schema(
    { 
        thoughtText: { 
            type: String, 
            required: 'Please leave a message',
            minlength: 1, 
            maxlength: 250
        }, 
        createdDate: { 
            type: Date, 
            default: Date.now, 
            get: timestamp => dateFormat(timestamp)
        }, 
        username: { 
            type: String, 
            required: true
        }, 
        reactions: [reactionSchema]
    }, 
    { 
        toJSON: { 
            getters: true, 
        }, 
        id: false, 
    }
); 

thoughtSchema.virtual('reactionCount').get(function() { 
    return this.reactions.length; 
}); 

const Thought = model('Thought', thoughtSchema); 

module.exports = Thought; 

