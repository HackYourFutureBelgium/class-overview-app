import displayMany from '../utils/display-many.js';
import renderAvatar from '../utils/render-avatar.js';
import renderActivity from '../utils/render-activity.js';
import linkButton from '../utils/link-button.js';
import listify from '../utils/listify.js';
import goTo from '../utils/goTo.js';
import moduleDetails from '../module/details.js'
import moduleDetailsNew from '../module-new/details.js'

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
    `https://github.com/${student.userName}?tab=projects`
  );


  const notesRepo = linkButton(
    'hack-my-future',
    `https://github.com/${student.userName}/hack-my-future`
  );

  const issues = document.createElement('div');
  issues.style = 'display: inline;';
  issues.innerHTML = 'class issues: ';
  issues.appendChild(
    linkButton(
      'individual ',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}+label%3Aindividual`
    )
  );
  issues.appendChild(
    linkButton(
      'group ',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=assigned%3A${student.userName}+label%3Agroup`
    )
  );
  issues.appendChild(
    linkButton(
      'homework ',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}+label%3Ahomework`
    )
  );
  issues.appendChild(
    linkButton(
      'check-ins',
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}+label%3Awednesday-check-in`
    )
  );
  issues.appendChild(document.createElement('br'));
  issues.appendChild(document.createTextNode('   '));
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
      `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}+is%3Apr`
    )
  );

  const staticLinks = listify([
    issues,
    githubLink,
    learnables,
    notesRepo,
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
    if (module.repo === 'new') {
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
          `project board: ${student.userName}`,
          `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}/?card_filter_query=assigned%3A${student.userName}`
        )
      );
      if (module.weeks) {
        for (let i = 1; i <= module.weeks; i++) {
          homeworkBoard.appendChild(document.createElement('br'));
          homeworkBoard.appendChild(
            linkButton(
              `week-${i}`,
              `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}/?card_filter_query=label%3Aweek-${i}+author%3A${student.userName}`
            )
          );
        }
      }
      const individualIssue = linkButton(
        'issues: individual',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}+label%3Aindividual`
      );
      const groupIssues = linkButton(
        'issues: group',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}+label%3Awednesday-check-in`
      );
      const assigned = linkButton(
        'issues: assigned',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+assignee%3A${student.userName}`
      );
      const authored = linkButton(
        'issues: authored',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}`
      );


      debugger
      const detailsButton = module.repo === 'new'
        ? goTo(moduleDetailsNew, [state, module], 'details')
        : goTo(moduleDetails, [state, module], 'details');



      const linksList =
        module.status === 'to do'
          ? listify([status])
          : listify([
            status,
            homeworkBoard,
            individualIssue,
            groupIssues,
            // sundayReview,
            authored,
            assigned,
            detailsButton
          ]);

      moduleContainer.appendChild(linksList);

      return moduleContainer;
    } else {
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
      const assigned = linkButton(
        'issues: assigned',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+assignee%3A${student.userName}`
      );
      const authored = linkButton(
        'issues: authored',
        `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}`
      );



      const detailsButton = goTo(moduleDetails, [state, module], 'details');



      const linksList =
        module.status === 'to do'
          ? listify([status])
          : listify([
            status,
            homeworkBoard,
            homeworkIssues,
            wednesdayCheckIns,
            // sundayReview,
            authored,
            assigned,
            detailsButton
          ]);

      moduleContainer.appendChild(linksList);

      return moduleContainer;

    }
  });

  const perModule = displayMany(specifiedModules, specifiedTitle);
  container.appendChild(perModule);

  return container;
};
