import displayMany from '../utils/display-many.js';
import renderAvatar from '../utils/render-avatar.js';
import linkButton from '../utils/link-button.js';
import listify from '../utils/listify.js';
import goTo from '../utils/goTo.js';
import studentDetails from '../student/details.js'
import coachDetails from '../coach/details.js'

export default (state, module) => {
  history.pushState(
    {},
    null,
    window.location.pathname + '?module=' + module.repoName
  );

  const container = document.createElement('div');

  // headers
  const name = document.createElement('h1');
  name.innerHTML = module.repoName;
  container.appendChild(name);

  const status = document.createElement('h2');
  // status.style.fontWeight = 'bold';
  status.className = 'module-thumb-status';
  const weeksText = module.weeks ? `${module.weeks} weeks: ` : '';
  status.innerHTML = weeksText + module.status;
  container.appendChild(status);

  // img & static links

  const homeworkBoard = document.createElement('div');
  homeworkBoard.style = 'display: inline;';
  homeworkBoard.innerHTML = 'homework board: ';
  homeworkBoard.appendChild(
    linkButton(
      'all homework',
      `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}`
    )
  );
  if (module.weeks) {
    for (let i = 1; i <= module.weeks; i++) {
      homeworkBoard.appendChild(document.createElement('br'));
      homeworkBoard.appendChild(
        linkButton(
          `homework: week-${i}`,
          `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}?card_filter_query=label%3Aweek-${i}`
        )
      );
    }
  }

  const checkIns = document.createElement('div');
  checkIns.style = 'display: inline;';
  checkIns.innerHTML = 'wednesday check-ins: ';
  checkIns.appendChild(
    linkButton(
      'all check-ins',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+label%3Awednesday-check-in`
    )
  );
  if (module.weeks) {
    for (let i = 1; i <= module.weeks; i++) {
      checkIns.appendChild(document.createElement('br'));
      checkIns.appendChild(
        linkButton(
          `check-ins: week-${i}`,
          `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+label%3Awednesday-check-in+label%3Aweek-${i}`
        )
      );
    }
  }

  const sundayReviews = linkButton(
    'sunday review issues',
    `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+label%3Asunday-review`
  );

  const allIssues = linkButton(
    'all issues',
    `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}`
  );
  const sharedNotes = linkButton(
    'shared notes',
    `https://github.com/${state.userName}/${state.repoName}/tree/master/shared-notes/${module.repoName}.md`
  );

  const moduleRepo = document.createElement('div');
  moduleRepo.style = 'display: inline;';
  moduleRepo.innerHTML = 'module repository';
  moduleRepo.appendChild(
    linkButton(
      'main page',
      `https://github.com/${module.userName || state.userName}/${
      state.repoName
      }`
    )
  );
  if (module.weeks) {
    for (let i = 1; i <= module.weeks; i++) {
      moduleRepo.appendChild(document.createElement('br'));
      moduleRepo.appendChild(document.createTextNode(`week ${i}:`));
      moduleRepo.appendChild(
        linkButton(
          `assignments`,
          `https://github.com/${module.userName || state.userName}/${
          module.repoName
          }/tree/master/week-${i}`
        )
      );
      moduleRepo.appendChild(
        linkButton(
          `lesson plan`,
          `https://hackyourfuture.be/${module.repoName}/week-${i}`
        )
      );
    }
  }

  const singletons = document.createElement('div');
  singletons.appendChild(sundayReviews);
  singletons.appendChild(document.createElement('br'));
  singletons.appendChild(allIssues);
  singletons.appendChild(document.createElement('br'));
  singletons.appendChild(sharedNotes);

  const staticLinks = listify([
    moduleRepo,
    homeworkBoard,
    checkIns,
    singletons
  ]);
  staticLinks.style = 'display: flex; flex-direction: row; justify-content: space-around;';
  container.appendChild(staticLinks);

  // specified student links
  container.appendChild(document.createElement('hr'));

  const specifiedStudentsTitle = document.createElement('h2');
  specifiedStudentsTitle.innerHTML = `<code>${module.repoName}</code>: Student Links`;

  const specifiedStudents = state.students.map(student => {
    const studentContainer = document.createElement('div');
    studentContainer.id = student.name;
    studentContainer.className = 'student-thumb';

    const studentImg = renderAvatar(student);
    studentContainer.appendChild(studentImg);

    const nameComponent = document.createElement('h2');
    nameComponent.innerHTML = student.name;
    nameComponent.className = 'student-thumb-name';


    let className = null;
    if (student.className) {
      className = document.createElement('text');
      className.innerHTML = student.className;
    };

    const githubLink = linkButton(
      student.userName,
      `https://github.com/${student.userName}?tab=repositories`
    );

    const homeworkProgress = linkButton(
      'homework progress',
      `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}?card_filter_query=author%3A${student.userName}`
    );
    const homeworkIssues = linkButton(
      'all authored issues',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${student.userName}`
    );

    const assigned = linkButton(
      'all assigned issues',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+assignee%3A${student.userName}`
    );


    const detailsButton = goTo(studentDetails, [state, student], 'details');

    const linksList = listify([
      nameComponent,
      className,
      homeworkProgress,
      homeworkIssues,
      assigned,
      githubLink,
      detailsButton
    ]);

    studentContainer.appendChild(linksList);

    return studentContainer;
  });

  if (module.status !== 'to do') {
    const perStudent = displayMany(specifiedStudents, specifiedStudentsTitle);
    container.appendChild(perStudent);
  }

  // specified coaches links
  container.appendChild(document.createElement('hr'));

  const specifiedCoachesTitle = document.createElement('h2');
  specifiedCoachesTitle.innerHTML = `<code>${module.repoName}</code>: Coach Links`;

  const specifiedCoaches = state.coaches.map(coach => {
    if (!coach.modules.find(mod => mod.repoName === module.repoName)) {
      return;
    }
    const coachContainer = document.createElement('div');
    coachContainer.id = coach.name;
    coachContainer.className = 'student-thumb';

    const coachImg = renderAvatar(coach);
    coachContainer.appendChild(coachImg);

    const nameComponent = document.createElement('h2');
    nameComponent.innerHTML = coach.name;
    nameComponent.className = 'student-thumb-name';

    const userNameComponent = document.createElement('text');
    userNameComponent.innerHTML = coach.userName;

    const toReview = linkButton(
      'homework to review',
      `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}?card_filter_query=assignee%3A${coach.userName}`
    );
    const allAssigned = linkButton(
      'all assigned issues',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+assignee%3A${coach.userName}`
    );
    const allAuthored = linkButton(
      'all authored issues',
      `https://github.com/${state.userName}/${state.repoName}/issues/?q=milestone%3A${module.repoName}+author%3A${coach.userName}`
    );

    let role;
    if (Array.isArray(coach.modules)) {
      const rollText = coach.modules.find(
        next => next.repoName === module.repoName
      ).role;
      if (rollText) {
        role = document.createElement('text');
        role.innerHTML = rollText;
      }
    }


    const detailsButton = goTo(coachDetails, [state, coach], 'details');

    const linksList = listify([
      nameComponent,
      role,
      // userNameComponent,
      toReview,
      allAssigned,
      allAuthored,
      detailsButton
    ]);

    coachContainer.appendChild(linksList);

    return coachContainer;
  });

  const perCoach = displayMany(specifiedCoaches, specifiedCoachesTitle);
  container.appendChild(perCoach);

  return container;
};
