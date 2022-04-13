/* eslint-disable consistent-return */
/* eslint-disable prettier/prettier */
import { nanoid } from 'nanoid'
import Joi from 'joi'
import logger from './logger'

const todos = []

const todoSchema = Joi.object({
    text: Joi.string().min(10).required(),
    completed: Joi.boolean().required(),
})

const baseTodo = {
    id: nanoid(),
    text: 'Test to do item',
    completed: false,
}

todos.push(baseTodo)

export const getTodos = () => {
    logger.log.success('Getting todos')
    return todos
}
export const getTodo = (id) => {
    logger.log.success(`Getting todo with id: ${id}`)
    return todos.find((todo) => todo.id === id)
}

export const addTodo = (todo) => {
    logger.log.info(`Validating ${todo}`)
    const { error } = todoSchema.validate(todo)

    if (error) {
        logger.log.error(new Error(`Validation error: ${error.message}`))
        return { error }
    }
    logger.log.success(`Validated: ${todo}`)
    const newTodo = { id: nanoid(), ...todo}
    todos.push({ id:nanoid(), ...todo })
    return { newTodo }

}