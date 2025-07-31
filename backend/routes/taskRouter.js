const express = require('express')
const {protect, authorization} = require('../middlewares/authMiddleware')
const {createTask, updateTask, deleteTask, getUserTask, getAllTask} = require('../controllers/taskControllers')

const router = express.Router()

router.post("/create", protect, authorization("admin", "manager"), createTask)

router.put("/update/:id", protect, authorization("admin", "manager"), updateTask)

router.delete("/delete/:id", protect, authorization("admin"), deleteTask)

router.get("/userTask", protect, authorization("employee"), getUserTask)

router.get("/allTask", protect, authorization("admin", "manager"), getAllTask)

module.exports = router




// // routes/taskRoutes.js
// const express = require('express');
// const {
//     createTask,
//     updateTask,
//     deleteTask,
//     getUserTask,
//     getAllTask,
//     getAssignedByMeTasks,
//     getTasksAssignedToMeAndByMe
// } = require('../controllers/taskControllers');
// const { protect, authorization } = require('../middleware/authMiddleware');
// const router = express.Router();

// // Public routes (if any, though tasks usually require auth)
// // router.get('/', getAllTask); // Example: if you want public access to tasks

// // Authenticated routes
// router.post('/', protect, authorization('admin', 'manager'), createTask); // Admin/Manager can create
// router.put('/:id', protect, authorization('admin', 'manager', 'teamLeader', 'employee'), updateTask); // All roles can update based on logic
// router.delete('/:id', protect, authorization('admin', 'manager'), deleteTask); // Admin/Manager can delete

// // Get tasks assigned TO the logged-in user (Employee, Manager, TeamLeader, Admin)
// router.get('/my-tasks', protect, getUserTask);

// // Get tasks assigned BY the logged-in user (Manager, Admin)
// router.get('/assigned-by-me', protect, authorization('admin', 'manager'), getAssignedByMeTasks);

// // Get all tasks (Admin only)
// router.get('/all', protect, authorization('admin'), getAllTask);

// // Combined tasks for Manager dashboard
// router.get('/dashboard-tasks', protect, authorization('manager'), getTasksAssignedToMeAndByMe);

// module.exports = router;
