package com.jackyCode.jackyKanban.services;

import com.jackyCode.jackyKanban.domain.Backlog;
import com.jackyCode.jackyKanban.domain.ProjectTask;
import com.jackyCode.jackyKanban.exception.ProjectNotFoundException;
import com.jackyCode.jackyKanban.repository.BackLogRepository;
import com.jackyCode.jackyKanban.repository.ProjectRepository;
import com.jackyCode.jackyKanban.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BackLogRepository backLogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    protected ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {

        // ProjectTasks are added to a specific project, project != null, BackLog exists
        Backlog backlog = projectService.findProjectIdentifier(projectIdentifier, username).getBacklog();
        // set BackLog to ProjectTask
        projectTask.setBacklog(backlog);
        // we want our project sequence to be like: IDPRO-1, IDPRO-2, ...
        Integer BacklogSequence = backlog.getPTSequence();
        // Update BackLog sequence
        BacklogSequence++;
        backlog.setPTSequence(BacklogSequence);
        // Add sequence to ProjectTask
        projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
        // Initial priority when null
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }
        // Initial status when null
        if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);


    }

    public Iterable<ProjectTask> findBacklogById(String id, String username) {

        projectService.findProjectIdentifier(id, username);

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findProjectTaskByProjectSequence(String backlog_id, String sequence, String username) {
        // make sure we are searching on existing backlog
        projectService.findProjectIdentifier(backlog_id, username);
        // make sure our task existing
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project task: " + sequence + " does not exist");
        }
        // make sure backlog/project id in the url be right project
        if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
            throw new ProjectNotFoundException("Project Task " + sequence + " does not exist in Project: " + backlog_id);
        }
        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id , String sequence,
                                               String username) {
        findProjectTaskByProjectSequence(backlog_id, sequence, username);
        return projectTaskRepository.save(updatedTask);
    }

    public void deleteProjectTaskSequence(String backlog_id, String sequence, String username) {

        ProjectTask projectTask = findProjectTaskByProjectSequence(backlog_id, sequence, username);

        projectTaskRepository.delete(projectTask);
    }
}
