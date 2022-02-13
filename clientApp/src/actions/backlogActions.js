import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK, DRAG_UPDATE_TASK} from '../actions/types';

export const addProjectTask = (backlog_id, project_task,history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`);
        dispatch({
            "type": GET_ERRORS,
            "payload": {}
        })
    } catch (err) {
        dispatch({
            "type": GET_ERRORS,
            "payload": err.response.data
        })
    }
}

export const getBacklog = (backlog_id) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}`)
        dispatch({
            "type": GET_BACKLOG,
            "payload": res.data
        })
    } catch (err) {
        dispatch({
            "type": GET_ERRORS,
            "payload": err.response.data
        })
    }
}

export const getProjectTask = (backlog_id, sequence, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlog_id}/${sequence}`)
        dispatch({
            "type": GET_PROJECT_TASK,
            "payload": res.data
        })
        dispatch({
            "type": GET_ERRORS,
            "payload": {}
        })
    } catch (err) {
        history.push(`/projectBoard/${backlog_id}`);
    }
}

export const deleteProjectTask = (backlog_id, sequence) => async dispatch => {
    if (window.confirm("Are you sure to delete the project task?")) {
        await axios.delete(`/api/backlog/${backlog_id}/${sequence}`)
        dispatch({
            "type": DELETE_PROJECT_TASK,
            "payload": sequence
        })
    }
}

export const drapUpdate = (backlog_id, project_task,history) => async dispatch => {
        const res = await axios.post(`/api/backlog/${backlog_id}`, project_task);
        dispatch({
            "type": DRAG_UPDATE_TASK,
            "payload": res.data
        })
}