import PhotoIcon from '@mui/icons-material/Photo';
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import hair from './hair.png';
import head from './zoomer.png';
import save from './save.png';
import text from './text.png';
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
// below is list of components that appear in sidebar
// id - unique id
// title - title of tool
// icon - imported icon from material ui
// component - component string needed for conditional rendering in itemsList.js
export const tools = [
  {
    id: 0,
    title: "My Pics",
    icon: head,
    component: "uploadSection",
  },
  {
    id: 1,
    title: "Assets",
    icon: hair,
    component: "imagesSection",
  },

  {
    id: 2,
    title: "Text",
    icon: text,
    component: "textSection",
  },
  {
    id: 3,
    title: "Save",
    icon: save,
    component: "shareSection",
  },
];
