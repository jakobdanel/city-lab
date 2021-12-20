let {
    createTask,
    getAllTask,
    getOneTask,
    getUserToTask,
    getUserToTasks,
    deleteOneTask
} = require('./taskManager.js');
let {
    getAllUsers,
    getOneUser,
    createUser,
    deleteOneUser,
    modifyUser
} = require('./userManage.js');
// createTask({
//     taskName: 'Clean up',
//     user: '619d0b26f68313e3408c1e95',
//     modifier: '619d0b26f68313e3408c1e95',
//     details: '',
//     until: 'Today'
// });

async function foo() {
    let r = await deleteOneTask("619e194e80b77434b9ca8596");
    console.log(r);
}

foo()