package com.jackyCode.jackyKanban.web;

import com.jackyCode.jackyKanban.domain.Project;
import com.jackyCode.jackyKanban.services.MapValidationErrorService;
import com.jackyCode.jackyKanban.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        projectService.saveOrUpdateProject(project, principal.getName());
        return new ResponseEntity<Project>(project, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects(Principal principal) {
        return projectService.findAllProjects(principal.getName());
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId, Principal principal) {

        Project project = projectService.findProjectIdentifier(projectId.toUpperCase(), principal.getName());

        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId, Principal principal) {
        projectService.deleteProjectByIdentifier(projectId.toUpperCase(), principal.getName());

        return new ResponseEntity<String>("Project with ID '" + projectId.toUpperCase() + "' was deleted", HttpStatus.OK);
    }


}
