import { expect, test, } from '@playwright/test';
import { taskModel } from './fixtures/task.model';
import { deleteByHelper, postTask } from './support/helpers';
import { TasksPage } from './support/pages/tasks';
import data from './fixtures/tasks.json';

let taskspage: TasksPage

test.beforeEach(async ({ page }) => {
    taskspage = new TasksPage(page)

 })

 test.describe('cadastro', () => {

    test('Devo poder cadastrar uma tarefa', async ({ page, request }) => {
        const task = data.success as taskModel

        await deleteByHelper(request, task.name)

        await taskspage.go();
        await taskspage.create(task);
        await taskspage.shouldHaveText(task.name)

    })

    test('Não devo permitir tarefa duplicada', async ({ page, request }) => {

        const task = data.duplicate as taskModel

        await deleteByHelper(request, task.name);

        await postTask(request, task);
        await taskspage.go()
        await taskspage.create(task)
        await taskspage.alertHaveText('Task already exists!')



    })

    test('Campo obrigatório', async ({ page, request }) => {

        const task = data.required as taskModel

        await taskspage.go()
        await taskspage.create(task)

        const validationMessage = await taskspage.inputTaskName.evaluate(e => (e as HTMLInputElement).validationMessage)
        expect(validationMessage).toBe('This is a required field')


    })

  })

test.describe('atualização', () => {
    test('Deve concluir uma tarefa', async ({ page, request }) => {

        const task = data.update as taskModel

        await deleteByHelper(request, task.name);
        await postTask(request, task)

        await taskspage.go()
        await taskspage.toggle(task.name)
        await taskspage.shouldBeDone(task.name)




    })
})


test.describe('exclusão', () => {
    test('Deve excluir uma tarefa', async ({ page, request }) => { 

        const task = data.delete as taskModel

        await deleteByHelper(request, task.name)
        await postTask(request, task)
    
        await taskspage.go()
        await taskspage.remove(task.name)
        await taskspage.shouldNotExist(task.name)
        
   })
})

