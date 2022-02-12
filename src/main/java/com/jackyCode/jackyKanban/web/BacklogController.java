package com.jackyCode.jackyKanban.web;

import com.jackyCode.jackyKanban.domain.ProjectTask;
import com.jackyCode.jackyKanban.services.MapValidationErrorService;
import com.jackyCode.jackyKanban.services.ProjectTaskService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;


@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                   BindingResult result, @PathVariable String backlog_id,
                                                   Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask, principal.getName());

        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id, Principal principal) {
        return projectTaskService.findBacklogById(backlog_id, principal.getName());
    }

    @GetMapping("/{backlog_id}/{PT_id}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String PT_id, Principal principal) {
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlog_id ,PT_id, principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PutMapping("/{backlog_id}/{PT_id}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask updatedProjectTask,
                                               BindingResult result, @PathVariable String PT_id,
                                               @PathVariable String backlog_id,Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        projectTaskService.updateByProjectSequence(updatedProjectTask,backlog_id ,PT_id, principal.getName());

        return new ResponseEntity<ProjectTask>(updatedProjectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{PT_id}")
    public ResponseEntity<?> deleteProjecttask(@PathVariable String backlog_id, @PathVariable String PT_id,
                                               Principal principal) {
        projectTaskService.deleteProjectTaskSequence(backlog_id, PT_id, principal.getName());

        return new ResponseEntity<String>("Project Task: " + PT_id + " was deleted", HttpStatus.OK);
    }

}
