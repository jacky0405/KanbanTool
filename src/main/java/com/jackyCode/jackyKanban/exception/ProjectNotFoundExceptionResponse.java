package com.jackyCode.jackyKanban.exception;

public class ProjectNotFoundExceptionResponse {

    private String ProjectNotFound;

    public ProjectNotFoundExceptionResponse(String projectNotFound) {
        this.ProjectNotFound = projectNotFound;
    }

    public String getProjectNotFound() {
        return ProjectNotFound;
    }

    public void setProjectNotFound(String projectNotFound) {
        ProjectNotFound = projectNotFound;
    }
}
