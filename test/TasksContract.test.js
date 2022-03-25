const TasksContract = artifacts.require("TasksContract")

contract("TasksContract", () => {
    before(async () => {
        this.tasksContract = await TasksContract.deployed()
    })

    it('migrate deployed successfully', async () => {
        const address = this.tasksContract.address
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0)
        assert.notEqual(address, "")
    })

    it('get tasks list', async () => {
        const counter = await this.tasksContract.taskCounter()
        const task = await this.tasksContract.tasks(counter)

        assert.equal(task.id.toNumber(), counter)
        assert.notEqual(task.title, null)
        assert.notEqual(task.description, null)
        assert.equal(task.done, false)
        assert.equal(counter, 1)
    })

    it('created a task sucessfully', async () => {
        const result = await this.tasksContract.createTask("Some task", "Description..")
        const taskEvent = result.logs[0].args
        const tasksCounter = await this.tasksContract.taskCounter()

        assert.equal(tasksCounter, 2)
        assert.equal(taskEvent.id.toNumber(), 2)
        assert.equal(taskEvent.title, "Some task")
        assert.equal(taskEvent.description, "Description..")
        assert.equal(taskEvent.done, false)
        assert.notEqual(taskEvent.createdAt, null)
    })

    it('task toggle done', async () => {
        const result = await this.tasksContract.toggleDone(1)
        const taskEvent = result.logs[0].args
        const task = await this.tasksContract.tasks(1)

        assert.equal(task.done, true)
        assert.equal(taskEvent.done, true)
        assert.equal(taskEvent.id, 1)
    })
})