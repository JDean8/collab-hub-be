import { Request, Response, NextFunction } from "express";
import { type Project } from "../../db/data/test-data/projects";
import { type Skill } from "../../db/data/test-data/skills";
import { type Status_project } from "../../db/data/test-data/status-project";
const { selectAllProjects, insertProject, selectProjectById, selectSkillsByProjectId, updateProjectById, deleteProject, fetchProjectStatus, postProjectStatus, patchStatusById, postSkills, deleteSkill, fetchProjectMembers, fetchMemberRequests, postMemberRequest, deleteMemberRequest, deleteMember, postMember } = require("../models/ProjectModel");

type ProjectMembersProps = {
  rows: {
    user_id: number,
    username: string
  }[]
};

type ProjectMemberRequestsProps = {
  rows: {
    user_id: number,
    username: string
  }[]
}

exports.getAllProjects = (req: Request, res: Response, next: NextFunction) => {
  selectAllProjects()
    .then((data: Project[]) => {
      res.status(200).send({ projects: data });
    })
    .catch((err: Error) => next(err));
};

exports.postProject = (req: Request, res: Response, next: NextFunction) => {
  const { project } = req.body;
  insertProject(project)
    .then((project: Project) => {
      res.status(201).send({ project });
    })
    .catch((err: Error) => next(err));
};

exports.getProjectById = (req: Request, res: Response, next: NextFunction) => {
  selectProjectById(req.params.project_id)
  .then((project: Project) => {
    res.status(200).send({ project });
  })
  .catch((err: Error) => next(err));
}

exports.patchProjectById = (req: Request, res: Response, next: NextFunction) => {
  const { project } = req.body;
  if(project === undefined) return next({status: 400, msg: "Bad request"})
  return selectProjectById(req.params.project_id)
  .then(() => {
    return updateProjectById(req.params.project_id, project)
  })
  .then((project: Project) => {
    res.status(200).send({ project });
  })
  .catch((err: Error) => next(err));
}

exports.getSkillsByProjectId = (req: Request, res: Response, next: NextFunction) => {
  return selectProjectById(req.params.project_id)
  .then(() => { 
    return selectSkillsByProjectId(req.params.project_id) 
  })
  .then((skills: Skill[]) => {
    res.status(200).send({ skills });
  })
  .catch((err: Error) => next(err));
}

exports.deleteProjectById = (req: Request, res: Response, next: NextFunction) => {
  const { project_id } = req.params;
  deleteProject(project_id)
  .then(() => {
    res.sendStatus(204);
  })
  .catch((err: Error) => next(err));
}

exports.getProjectStatusByProjectId = (req: Request, res: Response, next: NextFunction) => {
  return selectProjectById(req.params.project_id)
  .then(() => {
    return fetchProjectStatus(req.params.project_id)
  })
  .then((status: string) => {
    res.status(200).send({ status });
  })
  .catch((err: Error) => next(err));
}

exports.postProjectStatusByProjectId = (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;
  return postProjectStatus(req.params.project_id, status)
  .then((status_project: Status_project) => {
    res.status(201).send(status_project);
  })
  .catch((err: Error) => next(err));
}

exports.patchProjectStatusById = (req: Request, res: Response, next: NextFunction) => {
  const { status } = req.body;
  patchStatusById(req.params.project_id, status)
  .then((status_project: Status_project) => {
    res.status(200).send(status_project);
  })
  .catch((err: Error) => next(err));
}

exports.postSkillsByProjectId = (req: Request, res: Response, next: NextFunction) => {
  const { skill } = req.body;
  postSkills(req.params.project_id, skill)
  .then((skills: Skill[]) => {
    res.status(201).send(skills);
  })
  .catch((err: Error) => { 
    next(err) });
}

exports.deleteSkillById = (req: Request, res: Response, next: NextFunction) => {
  const { skill_id } = req.params;
  const { project_id } = req.params;
  return selectProjectById(req.params.project_id)
  .then(() => {
    return selectSkillsByProjectId(req.params.project_id)
  })
  .then((skills: Skill[]) => {
    let doesSkillExist = false;
    skills.forEach((singleSkill: Skill) => {
      if(singleSkill.skill_id === Number(skill_id)) {
        doesSkillExist = true;
      }
    })
    if(doesSkillExist === false) return Promise.reject({status: 404, msg: "Skill not found"})
    return deleteSkill(skill_id, project_id)
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch((err: Error) => next(err));
}

exports.getProjectMembersByProjectId = (req: Request, res: Response, next: NextFunction) => {
  return selectProjectById(req.params.project_id)
  .then(() => {
    return fetchProjectMembers(req.params.project_id)
  })
  .then((members: ProjectMembersProps) => {
    res.status(200).send({ members });
  })
  .catch((err: Error) => next(err))
}

exports.getMemberRequestsByProjectId = (req: Request, res: Response, next: NextFunction) => {
  selectProjectById(req.params.project_id)
  .then(() => {
    return fetchMemberRequests(req.params.project_id)
  })
  .then((memberRequests: ProjectMemberRequestsProps) => {
    res.status(200).send({ memberRequests });
  })
  .catch((err: Error) => next(err))
}

exports.postMemberRequestByProjectId = (req: Request, res: Response, next: NextFunction) => {
  let requiredMembers = 0;
  const { memberRequest} = req.body;
  return fetchMemberRequests(req.params.project_id)
  .then((memberRequestArr: ProjectMembersProps[]) => {
    let doesMemberRequestExist = false;
    memberRequestArr.map((singleMemberRequest: any) => {
      if(singleMemberRequest.user_id === memberRequest.user_id) {
        doesMemberRequestExist = true;
      }
    })
    if (doesMemberRequestExist) return Promise.reject({status: 400, msg: "Member request already exists"})
  })
  .then(() => {
    return selectProjectById(req.params.project_id)
  })
  .then((project: Project) => {
    requiredMembers = project.required_members;
    return requiredMembers
  })
  .then(() => {
    return fetchProjectMembers(req.params.project_id)
  })
  .then((members: ProjectMembersProps[]) => {
    if(members.length >= requiredMembers) return Promise.reject({status: 400, msg: "Project is full"})
    let doesMemberExist = false;
    members.map((singleMember: any) => {
      if(singleMember.user_id === memberRequest.user_id) {
        doesMemberExist = true;
      }
    })
    if (doesMemberExist) return Promise.reject({status: 400, msg: "User is already a member of this project"})
  })
  .then(() => {
    return postMemberRequest(req.params.project_id, memberRequest)
  })
  .then((memberRequest: any) => {
    res.status(201).send(memberRequest);
  })
  .catch((err: Error) => {
    next(err)
  })
}

exports.deleteMemberRequestByProjectId = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const { project_id } = req.params;
  selectProjectById(project_id)
  .then(() => {
    return fetchMemberRequests(project_id)
  })
  .then((memberRequests: ProjectMemberRequestsProps[]) => {
    let doesMemberRequestExist = false;
    memberRequests.map((singleMemberRequest: any) => {
      if(singleMemberRequest.user_id === Number(user_id)) {
        doesMemberRequestExist = true;
      }
    })
    if(!doesMemberRequestExist) return Promise.reject({status: 404, msg: "Member request not found"})
  })
  .then(() => {
    return deleteMemberRequest(user_id, project_id)
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch((err: Error) => next(err))
}

exports.deleteMemberByProjectId = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const { project_id } = req.params;
  selectProjectById(project_id)
  .then(() => {
    return fetchProjectMembers(project_id)
  })
  .then((members: ProjectMembersProps[]) => {
    let doesMemberExist = false;
    members.map((singleMember: any) => {
      if(singleMember.user_id === Number(user_id)) {
        doesMemberExist = true;
      }
    })
    if(!doesMemberExist) return Promise.reject({status: 404, msg: "Member not found"})
  })
  .then(() => {
    return deleteMember(user_id, project_id)
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch((err: Error) => next(err))
}

exports.postMemberByProjectId = (req: Request, res: Response, next: NextFunction) => {
  const { member } = req.body;
  const { project_id } = req.params;
  if(member.decision !== "accepted" && member.decision !== "rejected") return next({status: 400, msg: "Bad request"})
  return fetchMemberRequests(project_id)
  .then((memberRequests: ProjectMemberRequestsProps[]) => {
    let doesMemberRequestExist = false;
    memberRequests.map((singleMemberRequest: any) => {
      if(singleMemberRequest.user_id === member.user_id) {
        doesMemberRequestExist = true;
      }
    })
    if(!doesMemberRequestExist) return Promise.reject({status: 404, msg: "Member request not found"})
  })
  .then(() => {
    return postMember(project_id, member)
  })
  .then(() => {
    res.status(201).send({decision: member.decision, feedback: member.feedback});
  })
  .catch((err: Error) => next(err))
}