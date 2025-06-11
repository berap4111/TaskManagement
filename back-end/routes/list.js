const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id, deadline } = req.body; 
        const existUser = await User.findById(id);
        if (existUser) {
            const list = new List({
                title,
                body,
                deadline, // Include deadline when creating the task
                user: existUser._id, // Directly use the user ID
            });
            await list.save().then(() => res.status(200).json({ list }));
            existUser.list.push(list);
            await existUser.save(); // Ensure user list is saved
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating task', error });
    }
});



//UPDATE

router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
        
        
            const list = await List.findByIdAndUpdate(req.params.id, { title, body });
            list.save().then(() => res.status(200).json({ message: "task Updated" }))
      

    } catch (error) {
        console.log(error)

    }
})

//DELETE
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.body; // Get user ID from the request body
        const taskId = req.params.id; // Task ID is still passed in the URL

        // Find the user and pull the task ID from their list
        const existUser = await User.findByIdAndUpdate(id, { $pull: { list: taskId } });

        if (existUser) {
            // Now delete the task from the List collection
            const list = await List.findByIdAndDelete(taskId);
            if (list) {
                res.status(200).json({ message: "Task deleted successfully" });
            } else {
                res.status(404).json({ message: "Task not found" });
            }
        } else {
            res.status(404).json({ message: "User not found or task not in user's list" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//card
router.get("/getTask/:id", async (req, res) => {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    if (list.length !== 0) {
        res.status(200).json({ list: list });
    } else {
        res.status(200).json({ message: "no Task" })
    }
})
// Update task status
router.patch('/updateTaskStatus/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!['Completed', 'Incomplete'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const task = await List.findByIdAndUpdate(
            taskId,
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: `Task status updated to ${status}`, task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating task status' });
    }
});





module.exports = router;