import displayMany from '../utils/display-many.js'
import renderAvatar from '../utils/render-avatar.js'
import renderActivity from '../utils/render-activity.js'
import linkButton from '../utils/link-button.js'
import listify from '../utils/listify.js'

export default (state, coach) => {
  history.pushState({}, null, window.location.pathname + '?coach=' + coach.userName);

  const container = document.createElement('div');

  // headers
  const name = document.createElement('h1');
  name.innerHTML = coach.name;
  container.appendChild(name);

  const userName = document.createElement('h2');
  userName.innerHTML = coach.userName;
  container.appendChild(userName);

  if (coach.className) {
    const className = document.createElement('h3');
    className.innerHTML = coach.className;
    container.appendChild(className);
  }



  // img & static links
  const imgAndStaticLinks = document.createElement('div');
  imgAndStaticLinks.style = 'display: flex; flex-direction: row; align-items : center';

  const img = renderAvatar(coach);
  imgAndStaticLinks.appendChild(img);

  const githubLink = linkButton(
    'repositories',
    `https://github.com/${coach.userName}?tab=repositories`
  );
  const personalPageLink = linkButton(
    'portfolio',
    'https://' + coach.userName + '.github.io'
  );
  const bioLink = linkButton(
    'coach bio',
    `https://github.com/${state.userName}/${state.repoName}/tree/master/coach-bios/${coach.userName}.md`
  );
  const learnables = linkButton(
    'learnables',
    `https://github.com/${coach.userName}/projects`
  );

  const issues = document.createElement('div');
  issues.style = 'display: inline;';
  issues.innerHTML = 'class issues: ';
  issues.appendChild(linkButton(
    'homework ',
    `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%3A${coach.userName}+label%3Ahomework`
  ));
  issues.appendChild(linkButton(
    'check-in',
    `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%3A${coach.userName}+label%3Awednesday-check-in`
  ));
  issues.appendChild(linkButton(
    'sunday review',
    `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%3A${coach.userName}+label%3Asunday-review`
  ));
  issues.appendChild(linkButton(
    'authored',
    `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%3A${coach.userName}`
  ));
  issues.appendChild(linkButton(
    'assigned ',
    `https://github.com/${state.repoName}/${state.repoName}/issues?q=assignee%3A${coach.userName}`
  ));
  issues.appendChild(linkButton(
    'pull requests',
    `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%3A${coach.userName}+isis%3Apr`
  ));

  const staticLinks = listify([
    issues,
    learnables,
    githubLink,
    personalPageLink,
    bioLink
  ]);
  imgAndStaticLinks.appendChild(staticLinks);
  container.appendChild(imgAndStaticLinks);

  const activity = renderActivity(coach);
  container.appendChild(activity);


  // specified module links
  container.appendChild(document.createElement('hr'));

  const specifiedTitle = document.createElement('h2');
  specifiedTitle.innerHTML = `${coach.name}: Module Links`;

  const specifiedModules = coach.modules
    .map(module => {
      const moduleContainer = document.createElement('div');
      moduleContainer.className = 'module-thumb';

      const moduleName = document.createElement('h3');
      moduleName.innerHTML = module.number + '. ' + module.repoName;
      moduleContainer.appendChild(moduleName);


      const homeworkIssues = linkButton(
        'homework board (assigned)',
        `https://github.com/${state.userName}/${state.repoName}/projects/${module.board}?q=assignee%3A${coach.userName}`
      );
      const homeworkProgress = linkButton(
        'homework board (all)',
        `https://github.com/${state.userName}/${state.repoName}/projects/${module.board}`
      );
      const wednesdayCheckIns = linkButton(
        'issues: check-ins',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone=${module.milestone}+label=wednesday-check-in`
      );
      const sundayReview = linkButton(
        'issues: sunday review',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone=${module.milestone}+label=sunday-review`
      );
      const assigned = linkButton(
        'issues: assigned',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone=${module.milestone}+assignee%3A${coach.userName}`
      );
      const all = linkButton(
        'issues: authored',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone=${module.milestone}+author%3A${coach.userName}`
      );


      const linksList = listify([
        homeworkIssues,
        homeworkProgress,
        wednesdayCheckIns,
        sundayReview,
        assigned,
        all
      ]);

      moduleContainer.appendChild(linksList);

      return moduleContainer;
    });

  const perModule = displayMany(specifiedModules, specifiedTitle);
  container.appendChild(perModule);

  return container;
}
