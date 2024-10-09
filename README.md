# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# RESOURCES I'D LIKE TO USE:
- For the onClick() follow button: https://lottiefiles.com/free-animation/confetti-animation-03-l2rZi2DGOI

- For the user button: https://lottiefiles.com/free-animation/user-avatar-yeps28Vxhi

- For likes: https://lottiefiles.com/free-animation/hearts-galore-924ayD2zyM

- For notifications: https://lottiefiles.com/free-animation/alerts-notifications-bell-Xcptholc22


Things i need to work with:
https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/

https://www.freecodecamp.org/news/json-server-for-frontend-development/

storage images in mongodb:
String newFileName = "my-image"; File imageFile = new File("/users/victor/images/image.png"); GridFS gfsPhoto = new GridFS(db, "photo"); GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile); gfsFile.setFilename(newFileName); gfsFile.save();