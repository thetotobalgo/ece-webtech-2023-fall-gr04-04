# Blogging application - ECE Webtech project

- For the profile of the user, only the password change and the link to the gravatar website work, we also implemented fake name and email change.

## Production 

- Vercel URL: https://ece-webtech-2023-fall-gr04-04.vercel.app/
- Supabase project URL: https://supabase.com/dashboard/project/fwlvwvttabugqsrvzbkp

## Authors

- Tom BALLET, group4, thetotobalgo/Moonwalkeuse
- Mohamed BAKIR, group4, baksaad
- Thayri BOUAICH, group4

## Evaluation

### Mandatory Tasks

* **Naming convention**
  * Grade: *2*
  * Comments: *We followed naming convention from the nextjs documentation, we have an issue with the layout.js, we could not have the L from layout in capital letter*
* **Project structure**
  * Grade: *2*
  * Comments: *We followed the nextjs convention aswell*
* **Git usage**
  * Grade: *1*
  * Comments: *Because we worked a lot together, mainly Tom (thetotobalgo, Moonwalkeuse) pushed on the repository*
* **Code quality**
  * Grade: *4*
  * Comments: *We indent using the command on visualcode*
* **Design, UX, and content**
  * Grade: *4*
  * Comments: *We wanted a simple and minimalist desing, with simple colors and text*

* **Home page**
  * Grade: *2*
  * Comments: *Basic home page with recent articles*
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
  * Grade: *3*
  * Comments: *For the moment the search is done on the page and not on the supabase*
* **Use an external API**
  * Grade: *2*
  * Comments: *We have a little api call to get the waves predictions*
* **Resource access control**
  * Grade: *6*
  * Comments: *We followed the supabase tutorial*
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


### Course Feedback

*Your feedback about the course, what you liked, what you disliked, what you missed...*

### Project Reuse

- [ ] We authorize the professors to use our project as an example for the next year students (facultative).
