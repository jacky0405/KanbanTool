import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import ProjectTask from './ProjectTasks/ProjectTask';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { drapUpdate } from '../../actions/backlogActions';
import { withRouter } from 'react-router-dom';

class Backlog extends Component {

  render() {
    
    const {project_tasks} = this.props;

    const tasks = project_tasks.map((task,index) => (
        <Draggable key={task.id} index={index} draggableId={task.id.toString()} task={task}>
            {(provided) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <ProjectTask key={task.id} task={task}/>
                    </div>
                )
            }}
            
        </Draggable>
    ))

    const handleDragEnd = ({destination, source}) => {
        console.log("from", source)
        console.log("to", destination)
        if(!destination) {
            return;
        }
        if(destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }

        let item = {...project_tasks[source.index]}
        
        const newProjectTask = {
                    "id": item.id,
                    "summary": item.summary,
                    "acceptanceCriteria": item.acceptanceCriteria,
                    "status": destination.droppableId,
                    "priority": item.priority,
                    "dueDate": item.dueDate,
                }
        console.log(newProjectTask)
        console.log( this.props.history)
        this.props.drapUpdate(item.projectIdentifier, newProjectTask, this.props.history);
        // if(source.droppableId === "TO_DO"){
        //     console.log("in todo")
        //     console.log(todoItems[source.index].props.task)
        // } else if(source.droppableId === "IN_PROGRESS"){
        //     console.log("in progress")
        //     console.log(inProgressitems[source.index].props.task)
        //     let item = {...inProgressitems[source.index].props.task};
        //     const newProjectTask = {
        //         "id": item.id,
        //         "summary": item.summary,
        //         "acceptanceCriteria": item.acceptanceCriteria,
        //         "status": destination.droppableId,
        //         "priority": item.priority,
        //         "dueDate": item.dueDate,
        //     }
        //     this.props.addProjectTask(item.projectIdentifier, newProjectTask, this.props.history);
        // } else if(source.droppableId === "DONE"){
        //     console.log("in done")
        //     console.log(doneItems[source.index].props.task)
        // }
    }

    let todoItems = [];
    let inProgressitems = [];
    let doneItems = [];

    for(let i=0; i < tasks.length; i++) {
        if(tasks[i].props.task.status === "TO_DO") {
            todoItems.push(tasks[i]);
        }else if(tasks[i].props.task.status === "IN_PROGRESS") {
            inProgressitems.push(tasks[i]);
        }else if(tasks[i].props.task.status === "DONE") {
            doneItems.push(tasks[i]);
        }
    }

    return (
        <div className="container">
            <DragDropContext onDragEnd={e => handleDragEnd(e)}>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        <Droppable droppableId='TO_DO'>
                            {(provided) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {todoItems}
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                            }
                        </Droppable>

                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        <Droppable droppableId='IN_PROGRESS'>
                            {(provided) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                         {inProgressitems}
                                         {provided.placeholder}
                                    </div>
                                )
                            }
                            }                        
                        </Droppable>

                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        <Droppable droppableId='DONE'>
                            {(provided) => {
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {doneItems}
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                            } 
                        </Droppable>

                    </div>
                </div>
                </DragDropContext>
        </div>
    );
  }
}

Backlog.propTypes = {
    drapUpdate: PropTypes.func.isRequired,
}

export default connect(null, {drapUpdate})(withRouter(Backlog));
