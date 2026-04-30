import { Locator, Page, expect } from '@playwright/test';
import  { taskModel } from '../../../fixtures/task.model';

  export class TasksPage {
   readonly page: Page
   readonly inputTaskName: Locator 

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = this.page.locator('#newTask')
    }

      async go() {
          await this.page.goto('/');
      }

      async create(task: taskModel) {
          await this.inputTaskName.fill(task.name);
          await this.page.click('button[class*="ButtonNewTask"]')
      }  
      async remove(taskName: string) {
          const traget = this.page.locator(`//p[text()="${taskName}"]/../button[contains(@class, "Delete")]`)
          await traget.click()
      }

      async shouldHaveText(taskName: string) {
          const taskList = this.page.locator(`css=.task-item p >> text=${taskName}`)
          await expect(taskList).toHaveText(taskName)
          await expect(taskList).toBeVisible()

      }

      async alertHaveText(text:string) {
          const taskList = this.page.locator('.swal2-html-container')
          await expect(taskList).toHaveText(text)
      }   

      async toggle(taskName: string) {
          const traget = this.page.locator(`//p[text()="${taskName}"]/../button[contains(@class, "Toggle")]`)
          await traget.click()
      }

      async shouldBeDone(taskName: string) {
           const text = this.page.getByText(taskName)
           await expect(text).toHaveCSS('text-decoration-line', 'line-through')
      }

       async shouldNotExist(taskName: string) {
          const taskList = this.page.locator(`css=.task-item p >> text=${taskName}`)
          await expect(taskList).not.toBeVisible()
      }

    }   