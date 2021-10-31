// imports
import { FaListUl, FaSun, FaHashtag, FaPlus } from "react-icons/fa";
import appData from "../data/app-data";
const { tags: tagList, projects: projectList } = appData();

export default function ({ projects, tags }) {
  return [
    { id: "today", icon: FaSun, text: "Today", type: 0, link: "/tags/today" },
    {
      id: "accordion",
      type: 1,
      items: [
        //projects
        {
          text: "Project",
          icon: FaListUl,
          route: "/projects",
          list: projects ? projects : projectList,
          button: {
            text: "new project",
            icon: FaPlus,
          },
          actions: {},
        },
        //tags
        {
          text: "Tag",
          icon: FaHashtag,
          route: "/tags",
          list: tags ? tags : tagList,
          button: {
            text: "new tag",
            icon: FaPlus,
          },
          actions: {},
        },
      ],
    },
  ];
}
