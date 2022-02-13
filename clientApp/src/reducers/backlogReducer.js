import {GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK, DRAG_UPDATE_TASK} from '../actions/types';

const initialState = {
    project_tasks : [],
    project_task : {}
}

export default function backlogReducer(state=initialState, action) {
    switch (action.type) {
        case GET_BACKLOG:
            return {
                ...state,
                project_tasks:action.payload
            }
        case GET_PROJECT_TASK:
            return {
                ...state,
                project_task:action.payload
            }
        case DELETE_PROJECT_TASK:
            return {
                ...state,
                project_tasks: state.project_tasks.filter(task => task.projectSequence !== action.payload)
            }
        case DRAG_UPDATE_TASK:
            const index = state.project_tasks.findIndex(task => task.id === action.payload.id)
            state.project_tasks[index].status = action.payload.status
            return {
                ...state,
                project_tasks: [...state.project_tasks]
            };
        default:
            return state;
    }
}