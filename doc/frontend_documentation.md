# Front End Documentation #

The front end is a react app utilizing react routers to navigate to different parts of the page, and CSS to stylize the page. Below, a high level overview will be given roughly describing the architecture of the code, and how files are organized.

# The src folder #
Inside the app's src file, there are 3 main folders, css, routes, and components

## The css folder ##
This folder holds css styling for each of the pages. Every page has a dedicated css file for that one page, and the App.css file is used for 'global' styling

## The routes folder ##
This folder stores the formatting/jsx of the entire page. It uses components stored in the components folder to generate
the formatting of the page.

## The components folder ##
This holds small parts, 'proper subsets' of code of sorts, that are called and used by the routes. They can be hotswapped out by the page as necessary.