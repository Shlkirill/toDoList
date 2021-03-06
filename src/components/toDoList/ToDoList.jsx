import React, { useState } from 'react'
import styles from './ToDoList.module.css'
import Task from './task/Task'
import { Field } from 'redux-form'
import { required } from '../fieldLevelValidation/validation';

export const renderField = ({ input, type, meta: { submitFailed, error, warning },} ) => {
    return (
        <div className={styles.inputForm_container}>
            <div>
                <textarea {...input} type={type} className={styles.inputForm} placeholder='Напишите новую задачу' />
            </div>
            <div className={styles.inputForm_error}>
                {submitFailed && ((error && <span >{error}</span>) ||
                    (warning && <span className={styles.inputForm_error}>{warning}</span>))}
            </div>
        </div>
    )
};

const ToDoList = (props) => {
    const [filterMode, setFilterMode] = useState(1);
    const [inProp, setInProp] = useState(true);

    let changeFilter = (filterNumber) => {
        setFilterMode(filterNumber);
        setInProp(!inProp);
    }

    let undoneTask = props.taskList.filter(item => !item.done)
    let doneTask = props.taskList.filter(item => item.done)
    let allTask = undoneTask.concat(doneTask)
    let resultAllTask = allTask.map((item) => {
        return <Task key={item.id} text={item.text} done={item.done} edit={item.edit}
            stageOfDone={props.stageOfDone} id={item.id}
            deleteTask={props.deleteTask} editTextTask={props.editTextTask} 
            date={item.createDateTask.date} time={item.createDateTask.time} />
    })

    let resultDoneTask = resultAllTask.filter((item) => item.props.done);
    let resultUnDoneTask = resultAllTask.filter((item) => !item.props.done);
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h3 className={styles.tittle}>Лист задач:</h3>
                <div className={styles.filter}>
                    <p className={filterMode == 1 ? styles.filter_active : ''} onClick={() => { changeFilter(1) }}>Все задачи</p>
                    <p className={filterMode == 2 ? styles.filter_active : ''} onClick={() => { changeFilter(2) }} >Активные задачи</p>
                    <p className={filterMode == 3 ? styles.filter_active : ''} onClick={() => { changeFilter(3) }}>Выполненные задачи</p>
                </div>
                <div className={styles.todolist}>
                    <div className={styles.info}>
                        <p className={styles.info_undone}>Активные задачи: <span>{undoneTask.length}</span> </p>
                        <p className={styles.info_done}>Выполненные задачи: <span>{doneTask.length}</span> </p>
                    </div>
                    <form onSubmit={props.handleSubmit} className={styles.formControl}>
                        <Field className={styles.input} name='newTask'
                            component={renderField} validate={[required]} />
                        <button className={styles.addTask}>Добавить</button>
                    </form>
                            <div className={styles.hhh}>
                                {filterMode == 1 ? resultAllTask : ''}
                                {filterMode == 2 ? resultUnDoneTask : ''}
                                {filterMode == 3 ? resultDoneTask : ''}
                            </div>
                </div>
            </div>
        </div >
    )
}

export default ToDoList