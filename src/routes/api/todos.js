/* eslint-disable prettier/prettier */
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import {addTodo, getTodos, getTodo } from '../../utils/todos'

const router = Router()

router.get('/', (req, res) => {
    const todos = getTodos()
    res.send(todos)

})

router.get('/:id', (req, res, next) => {
    const todo = getTodo(req.params.id)
    if (todo) {
        res.send(todo)
    } else {
        res.status(StatusCodes.NOT_FOUND)
        next('Not Found')
    }
})


router.post('/', (req, res, next) => {
    const todo = req.body
    const  response  = addTodo(todo)
    if (response.error) {
        res.status(StatusCodes.BAD_REQUEST)
        next(response.error)
    } else {
        res.status(StatusCodes.CREATED)
    res.send(response.newTodo)
    }
})

export default router