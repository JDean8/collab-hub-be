export interface Project {
  project_id: number;
  project_author: number;
  project_name: string;
  project_description: string;
  project_created_at: number;
  required_members: number;
}

export const projects: Project[] = [
  {
    project_id: 1,
    project_author: 1,
    project_name: "Project 1",
    project_description: "Project 1 description",
    project_created_at: 1669852800000,
    required_members: 3,
  },
  {
    project_id: 2,
    project_author: 2,
    project_name: "Project 2",
    project_description: "Project 2 description",
    project_created_at: 1669852800000,
    required_members: 3,
  },
  {
    project_id: 3,
    project_author: 3,
    project_name: "Project 3",
    project_description: "Project 3 description",
    project_created_at: 1669852800000,
    required_members: 3,
  },
  {
    project_id: 4,
    project_author: 1,
    project_name: "Project 4",
    project_description: "Project 4 description",
    project_created_at: 1669852800000,
    required_members: 3,
  },
  {
    project_id: 5,
    project_author: 2,
    project_name: "Project 5",
    project_description: "Project 5 description",
    project_created_at: 1669852800000,
    required_members: 3,
  },
  {
    project_id: 6,
    project_author: 3,
    project_name: "Project 6",
    project_description: "Project 6 description",
    project_created_at: 1669852800000,
    required_members: 1,
  },
];
