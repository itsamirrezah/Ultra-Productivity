// imports
import { FaListUl, FaSun, FaHashtag, FaPlus } from "react-icons/fa";
//actions
import { addProject, addTag } from "../store/actions";
import appData from "../data/app-data";
const { tags: tagList, projects: projectList } = appData();

export default function navigationData({ projects, tags }) {
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
            action: addProject,
          },
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
            action: addTag,
          },
        },
      ],
    },
  ];
}
