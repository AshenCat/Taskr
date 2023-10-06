const  mongoose = require("mongoose");
const Todos = require("../models/todo");
const { serializeMongooseObject } = require("./helper");

const {ObjectId} = mongoose.Types

mongoose.connect(
    require('../config').db, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }).then(_ => {
        console.log('connected to mongodb')
    }).catch(err => {
        console.log(err)
        console.error('failed to connect to mongodb');
    });

(async ()=>{
    // const todos = await Todo.aggregate([
    //     {
    //         $match: {}
    //     }, {
    //         $group: {
    //             _id: null,
    //             set: {$addToSet: '$set'}
    //         }
    //     }]);
    const todos = await Todos.aggregate([
        {
            $match: {}
        }, {
            $group: {
                _id: "$set",
                count: {$sum: 1}
            }
        }]
    );
    console.log(todos)
    // console.log(serializeMongooseObject(todos))
})()