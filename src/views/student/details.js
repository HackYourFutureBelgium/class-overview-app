import displayMany from '../utils/display-many.js';
import renderAvatar from '../utils/render-avatar.js';
import renderActivity from '../utils/render-activity.js';
import linkButton from '../utils/link-button.js';
import listify from '../utils/listify.js';

export default (state, student) => {
  history.pushState(
    {},
    null,
    window.location.pathname + '?student=' + student.userName
  );

  const container = document.createElement('div');

  // headers
  const name = document.createElement('h1');
  name.innerHTML = student.name;
  container.appendChild(name);

  const userName = document.createElement('h2');
  userName.innerHTML = student.userName;
  container.appendChild(userName);

  if (student.className) {
    const className = document.createElement('h3');
    className.innerHTML = student.className;
    container.appendChild(className);
  }

  // img & static links
  const imgAndStaticLinks = document.createElement('div');
  imgAndStaticLinks.style =
    'display: flex; flex-direction: row; align-items : center';

  const img = renderAvatar(student);
  imgAndStaticLinks.appendChild(img);

  const githubLink = linkButton(
    'repositories',
    `https://github.com/${student.userName}?tab=repositories`
  );
  const personalPageLink = linkButton(
    'portfolio',
    'https://' + student.userName + '.github.io'
  );
  const bioLink = linkButton(
    'student bio',
    `https://github.com/${state.userName}/${state.repoName}/tree/master/student-bios/${student.userName}.md`
  );
  const learnables = linkButton(
    'learnables',
    `https://github.com/${student.userName}/projects`
  );

  const issues = document.createElement('div');
  issues.style = 'display: inline;';
  issues.innerHTML = 'class issues: ';
  issues.appendChild(
    linkButton(
      'homework ',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}+label%3Ahomework`
    )
  );
  issues.appendChild(
    linkButton(
      'check-in',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}+label%3Awednesday-check-in`
    )
  );
  issues.appendChild(
    linkButton(
      'sunday review',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}+label%3Asunday-review`
    )
  );
  issues.appendChild(
    linkButton(
      'authored',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}`
    )
  );
  issues.appendChild(
    linkButton(
      'assigned ',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=assignee%3A${student.userName}`
    )
  );
  issues.appendChild(
    linkButton(
      'pull requests',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}+isis%3Apr`
    )
  );

  const staticLinks = listify([
    issues,
    learnables,
    githubLink,
    personalPageLink,
    bioLink,
  ]);
  imgAndStaticLinks.appendChild(staticLinks);
  container.appendChild(imgAndStaticLinks);

  const activity = renderActivity(student);
  container.appendChild(activity);

  // specified module links
  container.appendChild(document.createElement('hr'));

  const specifiedTitle = document.createElement('h2');
  specifiedTitle.innerHTML = `${student.name}: Module Links`;

  const specifiedModules = state.modules.map(module => {
    const moduleContainer = document.createElement('div');
    moduleContainer.className = 'module-thumb';

    const moduleName = document.createElement('h3');
    moduleName.innerHTML =
      (module.number ? module.number + '. ' : '') + module.repoName;
    moduleContainer.appendChild(moduleName);

    const status = document.createElement('text');
    status.innerHTML = module.status;

    const homeworkBoard = document.createElement('div');
    homeworkBoard.style = 'display: inline;';
    homeworkBoard.appendChild(
      linkButton(
        `homework board: ${student.userName}`,
        `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}/?card_filter_query=author%3A${student.userName}`
      )
    );
    if (module.weeks) {
      for (let i = 1; i <= module.weeks; i++) {
        homeworkBoard.appendChild(document.createElement('br'));
        homeworkBoard.appendChild(
          linkButton(
            student.userName + `: week-${i}`,
            `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}/?card_filter_query=label%3Aweek-${i}+author%3A${student.userName}`
          )
        );
      }
    }
    const homeworkIssues = linkButton(
      'issues: homework',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}+label%3Ahomework`
    );
    const wednesdayCheckIns = linkButton(
      'issues: check-ins',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}+label%3Awednesday-check-in`
    );
    const sundayReview = linkButton(
      'issues: sunday review',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}+label%3Asunday-review`
    );
    const assigned = linkButton(
      'issues: assigned',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+assignee%3A${student.userName}`
    );
    const authored = linkButton(
      'issues: authored',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}`
    );

    const linksList =
      module.status === 'to do'
        ? listify([status])
        : listify([
          status,
          homeworkBoard,
          homeworkIssues,
          wednesdayCheckIns,
          sundayReview,
          authored,
          assigned,
        ]);

    moduleContainer.appendChild(linksList);

    return moduleContainer;
  });

  const perModule = displayMany(specifiedModules, specifiedTitle);
  container.appendChild(perModule);

  return container;
};
