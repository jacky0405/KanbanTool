import React, { Component } from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';

class Backlog extends Component {
  render() {
    
    const {project_tasks} = this.props;

    const tasks = project_tasks.map(task => (
        <ProjectTask key={task.id} task={task}/>
    ))

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
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>

                    {todoItems}

                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-primary text-white">
                            <h3>In Progress</h3>
                        </div>
                    </div>
                    {inProgressitems}

                </div>
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-success text-white">
                            <h3>Done</h3>
                        </div>
                    </div>
                    {doneItems}
                </div>
            </div>
        </div>
    );
  }
}

export default Backlog;
