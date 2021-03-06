import displayMany from '../utils/display-many.js'
import renderAvatar from '../utils/render-avatar.js'
import linkButton from '../utils/link-button.js'
import listify from '../utils/listify.js'
import goTo from '../utils/goTo.js';
import moduleDetails from '../module/details.js'

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
  const allAssigned = linkButton(
    'issues: assigned',
    `https://github.com/${state.repoName}/${state.repoName}/issues?q=assignee%3A${coach.userName}`
  );
  const allAuthored = linkButton(
    'issues: authored',
    `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%3A${coach.userName}`
  );
  const githubLink = linkButton(
    coach.userName,
    `https://github.com/${coach.userName}?tab=repositories`
  );
  const bioLink = linkButton(
    'coach bio',
    `https://github.com/${state.userName}/${state.repoName}/tree/master/coach-bios/${coach.userName}.md`
  );


  const staticLinks = listify([
    allAssigned,
    allAuthored,
    githubLink,
    bioLink
  ]);
  imgAndStaticLinks.appendChild(staticLinks);
  container.appendChild(imgAndStaticLinks);



  // specified module links
  container.appendChild(document.createElement('hr'));

  const specifiedTitle = document.createElement('h2');
  specifiedTitle.innerHTML = `${coach.name}: Module Links`;

  const specifiedModules = coach.modules
    .map(module => {
      module = Object.assign({}, module, state.modules.find(next => next.repoName === module.repoName));
      const moduleContainer = document.createElement('div');
      moduleContainer.className = 'module-thumb';

      const moduleName = document.createElement('h3');
      moduleName.innerHTML = (module.number ? module.number + '. ' : '') + module.repoName;
      moduleContainer.appendChild(moduleName);


      const homeworkBoard = document.createElement('div');
      homeworkBoard.style = 'display: inline;';
      homeworkBoard.appendChild(linkButton(
        'homework board: all student assignments',
        `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}/`
      ));
      homeworkBoard.appendChild(document.createElement('br'));
      homeworkBoard.appendChild(linkButton(
        'all assigned assignments',
        `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}/?card_filter_query=assignee%3A${coach.userName}`
      ));
      if (module.weeks) {
        for (let i = 1; i <= module.weeks; i++) {
          homeworkBoard.appendChild(document.createElement('br'));
          homeworkBoard.appendChild(linkButton(
            `all assigned week-${i}`,
            `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}/?card_filter_query=label%3Aweek-${i}+assignee%3A${coach.userName}`
          ));
        }
      }
      const sundayReview = linkButton(
        'issues: sunday review',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+label%3Asunday-review`
      );
      const assigned = linkButton(
        'issues: assigned',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+assignee%3A${coach.userName}`
      );
      const all = linkButton(
        'issues: authored',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${coach.userName}`
      );
      const moduleRepo = linkButton(
        'module repo',
        `https://github.com/${module.userName || state.moduleOwner || state.userName}/${state.repoName}`
      );



      const detailsButton = goTo(moduleDetails, [state, module], 'details');


      const linksList = listify([
        homeworkBoard,
        sundayReview,
        assigned,
        all,
        moduleRepo,
        detailsButton
      ]);

      moduleContainer.appendChild(linksList);

      return moduleContainer;
    });

  const perModule = displayMany(specifiedModules, specifiedTitle);
  container.appendChild(perModule);

  return container;
}
