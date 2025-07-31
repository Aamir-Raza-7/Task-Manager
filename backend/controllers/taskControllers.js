const Task = require('../models/tasks')
const User = require('../models/users')

const createTask = async(req, res)=>{
    const{title, description, assignBy, assignTo} = req.body
    if(!title || !description || !assignBy || !assignTo){
        return res.status(400).json({msg: "bad request: missing params"})
    }
    try {
        const taskExists = await Task.findOne({title})
        if(taskExists){
            return res.status(400).json({msg: "Task already exists"})
        }
        const genTask = await Task.create({title, description, assignBy, assignTo})
        return res.status(201).json({
                task: {title: genTask.title, description: genTask.description, assignBy: genTask.assignBy, assignTo: genTask.assignTo}
            })
    } catch (err) {
        console.error(err)
        return res.status(500).json({msg: "internal server error!!"})
    }
}

const updateTask = async(req, res)=>{
    try {
        const{title, description, assignTo} = req.body 

        if(!title || !description || !assignTo){
        return res.status(400).json({msg: "bad request: missing params"})
        }
        const editTask = await Task.findByIdAndUpdate(req.params.id, {title, description, assignTo})
        if(!editTask) return res.status(400).json({msg: "Update not done Successfully"})
        res.status(201).json({message: "Updated Successfully"})
    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: "internal server error!!"})
    }
}

const deleteTask = async(req, res)=>{
    try {
        const {id} = req.params
        const removeTask = await Task.findByIdAndDelete(id)
        if(!removeTask) return res.status(400).json({msg: "Delete not done Successfully"})
        res.status(201).json({message: "Deleted Successfully"})
    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: "internal server error!!"})
    }
}

const getUserTask = async(req, res)=>{
    try {
        const tasks = await Task.find({assignTo: req.user._id})
        res.status(200).json({tasks})        
    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: "internal server error!!"})
    }
}

const getAllTask = async(req, res)=>{
    try {
        const tasks = await Task.find({}).populate('assignBy', 'name email role').populate('assignTo', 'name email role')
        res.status(200).json({tasks})        
    } catch (err) {
        console.error(err);
        return res.status(500).json({msg: "internal server error!!"})
    }
}


// const ROLE_HIERARCHY = {
//     'admin': 0,
//     'manager': 1,
//     'employee': 2
// };

// const createTask = async (req, res) => {
//     const { title, description, assignTo } = req.body;
//     const assignBy = req.user._id;
//     const assignByRole = req.user.role;

//     if (!title || !description || !assignTo) {
//             return res.status(400).json({ msg: "Bad request: missing params" });
//         }

//     try {
//         const assignedToUser = await User.findById(assignTo);
//         if (!assignedToUser) {
//             return res.status(404).json({ msg: "Assigned user not found" });
//         }

//         if (ROLE_HIERARCHY[assignByRole] >= ROLE_HIERARCHY[assignedToUser.role]) {
//             return res.status(403).json({ msg: "Cannot assign task to a user with equal or higher authority." });
//         }
//         const taskExists = await Task.findOne({ title, assignTo });
//         if (taskExists) {
//             return res.status(400).json({ msg: "Task already exists for this user" });
//         }
//         if (assignByRole !== 'admin' && assignByRole !== 'manager') {
//                 return res.status(403).json({ msg: "Only Admin or Manager can assign tasks." });
//             }
    
//             const genTask = await Task.create({ title, description, assignBy, assignTo });
//             return res.status(201).json({
//                     task: {
//                 _id: genTask._id,
//                 title: genTask.title,
//                 description: genTask.description,
//                 assignBy: genTask.assignBy,
//                 assignTo: genTask.assignTo,
//                 status: genTask.status
//             }
//         });
//     } catch (err) {
//             console.error(err);
//         return res.status(500).json({ msg: "Internal server error!" });
//     }
// };

// const updateTask = async (req, res) => {
//     const { id } = req.params;
//     const { title, description, assignTo, status } = req.body;
//     const loggedInUser = req.user;

//     try {
//         const task = await Task.findById(id);
//         if (!task) {
//             return res.status(404).json({ msg: "Task not found" });
//         }

  
//         if (loggedInUser.role === 'employee') {
//             if (task.assignTo.toString() !== loggedInUser._id.toString()) {
//                 return res.status(403).json({ msg: "You can only update tasks assigned to you." });
//             }
//             if (title || description || assignTo) {
//                 return res.status(403).json({ msg: "Employees can only update task status." });
//             }
//             if (status) {
//                 task.status = status;
//             }
//         }
       
//         else {
         
//             const isAssigner = task.assignBy.toString() === loggedInUser._id.toString();
//             const isAssignee = task.assignTo.toString() === loggedInUser._id.toString();

//             if (!isAssigner && !isAssignee && loggedInUser.role !== 'admin') {
//                 return res.status(403).json({ msg: "You are not authorized to update this task." });
//             }

//             if (title) task.title = title;
//             if (description) task.description = description;
//             if (status) task.status = status;

//             if (assignTo) {
//                 const assignedToUser = await User.findById(assignTo);
//                 if (!assignedToUser) {
//                     return res.status(404).json({ msg: "New assigned user not found" });
//                 }
         
//                 if (ROLE_HIERARCHY[loggedInUser.role] >= ROLE_HIERARCHY[assignedToUser.role]) {
//                     return res.status(403).json({ msg: "Cannot re-assign task to a user with equal or higher authority." });
//                 }
//                 task.assignTo = assignTo;
//             }
//         }
        
//         await task.save();
//         res.status(200).json({ msg: "Task updated successfully", task });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ msg: "Internal server error!" });
//     }
// };

// const deleteTask = async (req, res) => {
//     const { id } = req.params;
//     const loggedInUser = req.user;

//     try {
//         const task = await Task.findById(id);
//         if (!task) {
//             return res.status(404).json({ msg: "Task not found" });
//         }

//         // Only Admin can delete any task. Manager can delete tasks they assigned.
//         if (loggedInUser.role === 'admin' || task.assignBy.toString() === loggedInUser._id.toString()) {
    //             await Task.findByIdAndDelete(id);
    //             res.status(200).json({ msg: "Task deleted successfully" });
    //         } else {
        //             return res.status(403).json({ msg: "You are not authorized to delete this task." });
        //         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ msg: "Internal server error!" });
//     }
// };

// const getUserTask = async (req, res) => {
    //     try {
        //         // Fetch tasks assigned TO the logged-in user
//         const tasks = await Task.find({ assignTo: req.user._id })
//             .populate('assignBy', 'name email role') // Populate assignBy user details
//             .populate('assignTo', 'name email role'); // Populate assignTo user details
//         res.status(200).json({ tasks });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ msg: "Internal server error!" });
//     }
// };

// const getAllTask = async (req, res) => {
    //     try {
        //         // Fetch all tasks and populate assignBy and assignTo user details
        //         const tasks = await Task.find()
        //             .populate('assignBy', 'name email role')
        //             .populate('assignTo', 'name email role');
        //         res.status(200).json({ tasks });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ msg: "Internal server error!" });
//     }
// };
module.exports = {createTask, updateTask, deleteTask, getUserTask, getAllTask}