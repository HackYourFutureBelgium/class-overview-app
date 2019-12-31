# Homework Review App

Here is a simple frontend app to give an overview of each class's progress through the modules, each student's progress, and to simplify the code review process for coaches and alumni.  The data for this app will be located in two places:
* __Class Repos__: will store student data (name & userName) & module data (name, status, board) per class.  The class repos will also contain the main state data for each class.
* __Module Repos__: will store all assignments for that module.  This data will be loaded into a class repo's state when the app is initiated.

Class repositories will import the source from this repo via it's GitHub Pages URL, working effectively as a CDN.

---

This app is not designed to manage an HYF school.  It does not help to manage calendars, keep detailed notes on students, or any other administrative functions.

All it does is provide an easy interface to see:
* How far a class is through their HYF
* What assignments are part of each module
* Links to each student's homework repository, whether or not it exists. and live projects if the assignment requires it
* Give code reviews to students (the app can permalink to specific students and modules for sharing this work between coaches and alumni)
* Learning names & faces

Things it does not do:
* Give a completely accurate view of homework process or quality, the module project boards are
* Provide information on how well student homework is done
* Say whether or not a link is 404, all buttons appear not matter what
* Have any info on if assignments are completed on time, or in their entirety
* Support branch checks, Everything reads from master. maybe at some point branches can be added to the schema, but that complicates without much benefit at the moment.  Branches can also be part of a more comprehensive HYF management app and stay out of this simple code-review app.  We also aren't assigning specific branch names, so this wouldn't help at this point. and assigning branch names at any point might be too prescriptive.  and anyway, issues on project boards have links to specific branches, and we encourage them to come up with their own branching schemes.
* Link to specific assignments' issue cards.  To prescriptive, likely to break, then it's just clutter.


---
---
### <a href="https://hackyourfuture.be" target="_blank"><img src="https://user-images.githubusercontent.com/18554853/63941625-4c7c3d00-ca6c-11e9-9a76-8d5e3632fe70.jpg" width="100" height="100" alt="Hack Your Future: Belgium"></a>
