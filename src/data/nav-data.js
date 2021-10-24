// imports
import { FaListUl, FaSun, FaHashtag } from "react-icons/fa";
import appData from "../data/app-data";
const { tags: tagList, projects: projectList } = appData();

export default function (projects, tags) {
  return [
    { id: "today", icon: FaSun, text: "Today", type: 0, link: "/tags/today" },
    {
      type: 1,
      items: [
        //projects
        {
          text: "Projects",
          icon: FaListUl,
          route: "/projects",
          list: projects ? projects : projectList,
          button: {
            text: "create new projects",
          },
          actions: {},
        },
        //tags
        {
          text: "Tags",
          icon: FaHashtag,
          route: "/tags",
          list: tags ? tags : tagList,
          button: {
            text: "create new tags",
          },
          actions: {},
        },
      ],
    },
  ];
}
