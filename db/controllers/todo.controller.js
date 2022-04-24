const Todos = require('../models/todo');
const {todoConstants} = require('../../constants')
const {errorConstants} = require('../../constants')
const notificationController = require('./notification.controller');
const { serializeMongooseObject } = require('./helper');

const {ObjectId} = require('mongoose').Types;

function createTodoMetaData(data) {
    if (!data.type || data.type === '') 
        throw `Invalid data type`;
    if (!data.variant || data.variant === '')
        throw `Invalid data variant`
    return {
        category: 'TODO',
        type: data.type,
        silent: data.silent ?? false,
        variant: data.variant,
        message: data.message,
        metaData: data.metaData
    }
}
function createTodoErrorMetaData(data) {
    return {
        category: 'TODO',
        type: data.type,
        silent: data.silent ?? false,
        variant: data.variant ?? 'DANGER',
        message: data.message,
        metaData: data.metaData
    }
}

exports.createTodo = async (e, data) => {
    let metaData;
    try {
        const todo = await Todos.create(data);
        metaData = createTodoMetaData({
            type: todoConstants.CREATE_TODO,
            variant: 'SUCCESS',
            message: 'Successfully created todo!',
            metaData: todo
        })
        notificationController.createNotification(e, metaData);
    } catch(err) {
        console.error(err)
        let errorMetaData = createTodoErrorMetaData({
            type: errorConstants.TODO_ERROR,
            message: 'Error creating todo',
            metaData: {err, metaData}
        })
        notificationController.createNotification(e, errorMetaData);
    }
}

exports.archiveTodo = async (e, id) => {
    let metaData;
    try {
        const todo = await Todos.findOne({_id: ObjectId(id)});
        todo.status = 'Archived';
        todo.save();
        metaData = createTodoMetaData({
            type: todoConstants.ARCHIVE_TODO,
            variant: 'INFO',
            message: 'Successfully archived todo!',
            metaData: todo
        })
        notificationController.createNotification(e, metaData);
    } catch(err) {
        console.error(err)
        let errorMetaData = createTodoErrorMetaData({
            type: errorConstants.TODO_ERROR,
            message: 'Error archiving todo',
            metaData: {err, metaData}
        })
        notificationController.createNotification(e, errorMetaData);
    }
}

exports.toggleTodoDoneById = async (e, id) => {
    let metaData;
    try{
        const todo = await Todos.findOne({_id: ObjectId(id)});
        todo.done = !todo.done;
        await todo.save();
        metaData = createTodoMetaData({
            type: todoConstants.ARCHIVE_TODO,
            variant: 'INFO',
            silent: true,
            message: `Toggled todo to ${todo.done}`,
            metaData: todo
        })
        notificationController.createNotification(e, metaData);
    } catch(err) {
        console.error(err)
        let errorMetaData = createTodoErrorMetaData({
            type: errorConstants.TODO_ERROR,
            message: 'Error toggling todo',
            variant: 'WARNING',
            metaData: {err, metaData}
        })
        notificationController.createNotification(e, errorMetaData);
    }
}

exports.getUsersPublicPendingTodos = async (e, _userId) => {
    try {
        const todos = await Todos.find({visibility: 'PUBLIC', status: {$ne: 'Archived'}});
        e.sender.send(todoConstants.GET_USER_PUBLIC_PENDING_TODO, todos)
    } catch(err) {
        console.error(err)
        e.sender.send(errorConstants.TODO_ERROR, {
            variant: danger,
            message: 'Error fetching todos'
        })
    }
}

exports.getUserPendingTodos = async (e, _userId) => {
    try {
        const todos = await Todos.find({status: {$ne: 'Archived'}}).lean();
        e.sender.send(todoConstants.GET_USER_PENDING_TODO, todos.map(todo=>(serializeMongooseObject(todo))))
    } catch(err) {
        console.error(err)
        e.sender.send(errorConstants.TODO_ERROR, {
            variant: danger,
            message: 'Error feetching todos'
        })
    }
}