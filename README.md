# Blogging application - ECE Webtech project

**User Authentication**: Utilizing Supabase for user authentication, visitors can sign in and out of your website. The `UserContext` manages the user state throughout the application, allowing for personalized experiences such as commenting on articles and liking content.

**Article Display**:
   - **Fetching Articles**: Users can view a list of recent articles on the homepage, fetched from the Supabase database.
   - **Article Details**: When clicking on an article, users are taken to a detailed view where they can read the full content of the article.

**Article Creation**:
   - **Article Form**: A form where users can input the title, content, tags and description.
   - **Text Editor**: An interface for the content field where users can format their text, insert images, and possibly add other multimedia elements.

**Comments**:
   - **Viewing Comments**: Below each article, comments from other readers are displayed, each with a timestamp and the commenter's email.
   - **Posting Comments**: Authenticated users can post new comments on articles.

**Likes Feature**:
   - **Viewing Likes**: Each article shows a list of users who have liked it, represented by their Gravatar images.
   - **Liking/Unliking**: Authenticated users can like or unlike articles. This interaction updates the list of likes in real-time.

**Author Section**: Articles include an author section that displays the author's Gravatar image, email, and the publication date of the article.

**Search and Navigation**: Users can search for articles and navigate through different sections of the website, such as a forecast section and about page.

**Theme Toggling**: There is a feature for toggling the theme from light fo dark.

**User Profile**: Users have access to a profile page where they can change their password only.

**Gravatar Integration**: The website integrates Gravatar for displaying user avatars based on their email addresses.

## Production 

- Vercel URL: https://ece-webtech-2023-fall-gr04-04.vercel.app/
- Supabase project URL: https://supabase.com/dashboard/project/fwlvwvttabugqsrvzbkp

## Authors

- Tom BALLET, group4, thetotobalgo/Moonwalkeuse/totobalgo
- Mohamed BAKIR, group4, baksaad
- Thayri BOUAICH, group4, tom ballet hello

## Evaluation

**Estimated grade : 56.5/60**

### Mandatory Tasks

* **Naming convention**
  * Grade: *2*
  * Comments: *We followed naming convention from the nextjs documentation, we have an issue with the layout.js, we could not have the L from layout in capital letter*
* **Project structure**
  * Grade: *2*
  * Comments: *We followed the nextjs convention aswell*
* **Git usage**
  * Grade: *0.5*
  * Comments: *Because we worked a lot together, mainly Tom (thetotobalgo, totobalgo and Moonwalkeuse) pushed on the repository. We also had a lot of problem with our git repo, so it is very ugly, i send you an email about the issue*
* **Code quality**
  * Grade: *4*
  * Comments: *We indented the code using the command on visualcode*
* **Design, UX, and content**
  * Grade: *3*
  * Comments: *We wanted a simple and minimalist design, with simple colors and text. The header is not responsive*

* **Home page**
  * Grade: *2*
  * Comments: *Basic home page with the 3 recent articles*
* **Navigation**
  * Grade: *2*
  * Comments: *Simple header with all the accessible pages*
* **Login and profile page**
  * Grade: *4*
  * Comments: *The Auth library made it easy to do*
* **Post creation and display**
  * Grade: *5*
  * Comments: *We added a button to created an article in the article page only if the user is authentificated. Then we add a simple form to add title, description, content and tags*
* **Comment creation and display**
  * Grade: *4*
  * Comments: *User can add comments when an article is displayed and only if they are authentificated*
* **Post modification and removal**
  * Grade: *2*
  * Comments: *We can only delete an article*
* **Search**
  * Grade: *6*
  * Comments: *Supabase search using websearch*
* **Use an external API**
  * Grade: *2*
  * Comments: *We have a little api call to get the waves predictions, really simple data visualisation, unfortunatly, we have only 10 api calls per day*
* **Resource access control**
  * Grade: *6*
  * Comments: *We followed the supabase tutorial, the admin page is just front, there is no security check or anything, it was just for the bonus*
* **Account settings**
  * Grade: *4*
  * Comments: *If we are logged using github, we can't change anything, if we are authentificated via email, we can change password. We also add a fake form to modify our name and email*
* **WYSIWYG integration**
  * Grade: *2*
  * Comments: *We used the ReactQuill library*
* **Gravatar integration**
  * Grade: *2*
  * Comments: *We created a method that retrieve the gravatar url from the user and display the picture*
* **Light/dark mode**
  * Grade: *2*
  * Comments: *we implemented the ligh/dark mode using 2 css classes and a toggle method*

### Bonus Tasks

* ***Little game***   
  * Grade: *0.5*
  * Comments: *We add a little html game on the page*
* ***Likes on posts***   
  * Grade: *1*
  * Comments: *We created a table articlelikes, with the post Id and the user email*

* ***Admin page***
  * Grade: *0.5*
  * Comments: *We have a small admin page that can see all the contact messages*
  
## Miscellaneous

- Most of the commits are by moonwalkeuse, this is on Tom's VS Code, we don't know why but each time we commited, even if we changed github account, it commited using this username. We gave you screenshot in the public repo to proove that this is us. Each time that we pushed using this computer, it is someone else account, we know this seems sketchy but we can prove it to you. You can also check using fork, the account who pushed is either thetotobalgo, totobalgo or baksaad.

### Course Feedback

The best thing about this course is the wide range of skills it covers, from UX design and development to project management, giving us a comprehensive understanding of the web development process. 
The entire group has responded well to the web technology course, which provides an engaging and enriching learning environment.
The potential for skill reinforcement presented by the technical challenge of using only Next.js, Supabase, and Tailwind CSS was great. 
Furthermore, the focus on professional development techniques—like documentation, efficient use of Git, and project structure was instructive. 
Overall, the course found a good balance between theory and practical application. 
Adding more practical workshops to reinforce course topics is the only suggestions for improvement me can make.


### Project Reuse

- [x] We authorize the professors to use our project as an example for the next year students (facultative).
