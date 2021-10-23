//models
import Project from "../model/Project";
import Tag from "../model/Tag";

function getDummyProjects() {
  const projects = {};
  for (let i = 0; i < 5; i++) {
    const p = Project({
      title: `project-${i + 1}`,
      color: colors[(i + 1) % 3],
    });
    projects[p.id] = p;
  }
  return projects;
}

function getDummyTags() {
  const tags = {};
  for (let i = 0; i < 5; i++) {
    const t = Tag({
      title: `tag-${i + 1}`,
      color: colors[(i + 1) % 3],
    });
    tags[t.id] = t;
  }
  return tags;
}

const colors = { 0: "red", 1: "yellow", 2: "blue" };

export function navigationData(projects, tags) {
  return [
    { id: "today", icon: null, text: "Today", type: 0, link: "/tags/today" },
    {
      type: 1,
      items: [
        //projects
        {
          text: "Projects",
          icon: null,
          list: projects ? projects : getDummyProjects(),
          button: {
            text: "create new projects",
          },
          actions: {},
        },
        //tags
        {
          text: "Tags",
          icon: null,
          list: tags ? tags : getDummyTags(),
          button: {
            text: "create new tags",
          },
          actions: {},
        },
      ],
    },
  ];
}
