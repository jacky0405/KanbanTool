package com.jackyCode.jackyKanban.services;

import com.jackyCode.jackyKanban.domain.Backlog;
import com.jackyCode.jackyKanban.domain.Project;
import com.jackyCode.jackyKanban.domain.User;
import com.jackyCode.jackyKanban.exception.ProjectIdException;
import com.jackyCode.jackyKanban.exception.ProjectNotFoundException;
import com.jackyCode.jackyKanban.repository.BackLogRepository;
import com.jackyCode.jackyKanban.repository.ProjectRepository;
import com.jackyCode.jackyKanban.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private BackLogRepository backLogRepository;
    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {

        if(project.getId() != null) {
            Project existingProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
            if(existingProject != null && (!existingProject.getProjectLeader().equals(username))) {
                throw new ProjectNotFoundException("Project not found in your account");
            }
            if(existingProject == null) {
                throw new ProjectNotFoundException("Project with ID " + project.getProjectIdentifier() + " does not exist");
            }
        }

        try {
            User user = userRepository.findByUsername(username);
            project.setUser(user);
            project.setProjectLeader(user.getUsername());
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            if (project.getId() != null) {
                project.setBacklog(backLogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase()+"' already exists");
        }
    }

    public Project findProjectIdentifier(String projectId, String username) {

        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "'does not exists");
        }
        if(!project.getProjectLeader().equals(username)) {
            throw new ProjectNotFoundException("Project not found in your account");
        }

        return project;
    }

    public Iterable<Project> findAllProjects(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username) {

        projectRepository.delete(findProjectIdentifier(projectId, username));
    }

}
