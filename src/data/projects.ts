import rawProjects from "./projects.json";

export type ProjectsType = {
  name: string;
  slug: string;
  description: string;
  type?: "demo" | "crate";
  link?: string;
  tech: string[];
};

export const projects: ProjectsType[] = rawProjects as ProjectsType[];

export const getProjects = (): ProjectsType[] => projects;
