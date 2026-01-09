# Goal Garden
> Progress brought to life 



## Description
Goal Garden is a website that supports your growth and your goals. It provides you an interface that allows you to see your personal growth in the form of a growing plant. Complete more tasks and goals, the larger your plant grows.
Goal Garden also provides a unique way of tracking tasks and goals. It provides an interface that allows you to break down your goals from lifetime goals to yearly goals to smaller and smaller time frames down to single tasks. These smaller tasks are displayed in the calendar feature, allowing you to see the real actions you can take rather than just setting goals.

### Home Page
The home page of the website gives you an overview of all of your goals. It starts with welcome text and a basic progress bar below showing your total progress for all of your goals. It then has a grid of boxes each showing your different goals. Each box has a plant to visualize how much progress you have made for each of your different goals. Each box also has a section that shows the different details and the sub-goals or sub-tasks within each goal. Clicking on this box can allow you to edit the sub-goals or sub-tasks you have for each larger goal.

### Profile Page
The profile page provides different information about the user of the website. It has three different configurations but all of these configurations are summarized using the plant visualizer. The first configuration is the overview. It shows the list of all of the current goals and smaller taks of the user. The second configuration is the statistics. It shows the activity or the amount of tasks done by the person within different dates. Last is the archive. The archive shows all of the previous tasks and goals of the person.

### Calendar Page
The calendar page shows all of the tasks and the time of the day that they were planend to be finished. They appear in blocks that take up different rows based on the time that the user decides they should be done. The blocking feature works like how it does in Google Calendar.

### Settings Page
The settings page allows the user to change different aspects of the webiste. These are categorized into general, profile, and appearance settings. The general settings include things like language or notification settings. The profile settings include things like changing the profile picture or changing the name. Appearance settings include different layouts for the home page or light and dark mode settings. It also contains the help section which explains different features of the website like how the plant growth system works.

### About Page
The about page shows the logo and the title of our website in its header. Alongside it would be a plant or an image that encapsulates our website. Below this would be the main content describing the page and describing the individual features in a more detailed manner. It would also show images of the website.

## JavaScript
There are multiple parts of the page that will require JavaScript. First is the plant and progress bar in the home page. These require a system to compute the for the way the progress bar and the plant looks depending on the status of the goal. Second is the profile page. The large plant on the side of the profile page would also require a system to compute the way the plant would be shaped. Third is the calendar page which would require the user to interact with the differnet blocks of time. There needs to be JavaScript in place for the user to be able to change the size and move the different blocks of time that they set.

## Logo
![GoalGarden](assets/GoalGarden_logo.png)

### Wireframe
[Canva Link](https://www.canva.com/design/DAG3KHiH9LM/R0gjlAUo4Clk18q5jV2GOQ/edit?utm_content=DAG3KHiH9LM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## 3rd Qtr Update

## Final Title
Goal Garden

## 2-Sentence Description

## Features
Interactive addition and display of goals, along with sub-tasks. Individual and overall progress calculation and display via progressbars, as well as cute little plants to visualize them. Tasks can be viewed and sorted through several categories, with sorting via time (through a calendar system), subtask categories, and more. 

## Details
Theme configuration (we are also considering adding a custom-theme creation tool instead of just relying on theme presets), if possible, having an actual cloud storage system for accounts instead of relying on localstorage or browser cache to store user data. The JavaScript and css has also been refactored to split into multiple files. This allows the development and actual logic to be easier to understand and work with, to lessen bugs and speed up the developmet of features. We are also working on styling / layout solutions for different monitor sizes (using viewport width / height relative values instead of hardcoded pixel sizes).

## Definition of Clone
Cloning allows the copying and manipulation of existing html elements, to create new versions of that element without affecting the original one. In our project, we use Node.cloneNode to copy goal card templates, which are instances of the goals from user data. It makes working with the document much easier as we only have to make the actual template and configure the logic in its manipulation of its clones, without worrying about tampering with the original template html.
