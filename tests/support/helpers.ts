import { APIRequestContext, expect } from '@playwright/test';
import { taskModel } from '../fixtures/task.model';

const BASE_API = process.env.BASE_API

 export async function deleteByHelper(request: APIRequestContext, taskName: string) {
   await request.delete(`${BASE_API}/helper/tasks/${taskName}`);
}

export async function postTask(request: APIRequestContext, task: taskModel) {
    const newTask = await request.post(`${BASE_API}/tasks`, { data: task });
    expect(newTask.ok()).toBeTruthy();
}