import renderDetails from './details.js';
import linkButton from '../utils/link-button.js'
import listify from '../utils/listify.js'

export default (state, module) => {

  const title = document.createElement('h2');
  title.innerHTML = module.number + '. ' + module.repoName;

  const status = document.createElement('text');
  // status.style.fontWeight = 'bold';
  status.className = 'module-thumb-status';
  const weeksText = module.weeks
    ? `${module.weeks} weeks: `
    : '';
  status.innerHTML = weeksText + module.status;


  const boardA = linkButton(
    'homework board',
    `https://github.com/${state.userName}/${state.repoName}/projects/${module.project}`
  );

  const moduleRepo = document.createElement('div');
  moduleRepo.style = 'display: inline;';
  moduleRepo.appendChild(
    linkButton(
      'module repo',
      `https://github.com/${module.userName || state.moduleOwner || state.userName}/${module.repoName}`
    )
  );
  moduleRepo.appendChild(document.createElement('br'));
  if (module.weeks) {
    for (let i = 1; i <= module.weeks; i++) {
      moduleRepo.appendChild(document.createTextNode(`week ${i}:`));
      moduleRepo.appendChild(
        linkButton(
          `assignments`,
          `https://github.com/${module.userName || state.moduleOwner || state.userName}/${module.repoName}/tree/master/week-${i}`
        )
      );
      moduleRepo.appendChild(
        linkButton(
          `lesson plan`,
          `https://${state.domain}/${module.repoName || state.moduleOwner || state.userName}/week-${i}`
        )
      );
      moduleRepo.appendChild(document.createElement('br'));
    }
  }

  const sharedNotesA = linkButton(
    'shared notes',
    `https://github.com/${state.userName}/${state.repoName}/tree/master/shared-notes/${module.repoName}`
  );


  const allIssues = linkButton(
    'all issues',
    `https://github.com/${state.userName}/${state.repoName}/issues?q=milestone%3A${module.repoName}`
  );

  const sundayReviews = linkButton(
    'sunday reviews',
    `https://github.com/${state.userName}/${state.repoName}/issues?q=milestone%3A${module.repoName}+label%3Asunday-review`
  );

  const wednesdayCheckIns = linkButton(
    'wednesday check-ins',
    `https://github.com/${state.userName}/${state.repoName}/issues?q=milestone%3A${module.repoName}+label%3Awednesday-check-in`
  );


  const detailsButton = document.createElement('button');
  detailsButton.innerHTML = 'details';
  detailsButton.onclick = () => {
    const moduleEl = renderDetails(state, module);
    state.body.innerHTML = '';
    state.body.appendChild(moduleEl);
  };


  // const moduleInfo = [status, detailsButton, boardA, repoA, sharedNotesA]
  const moduleInfo = module.status === 'to do'
    ? listify([status])
    : listify([
      status,
      moduleRepo,
      boardA,
      wednesdayCheckIns,
      sundayReviews,
      sharedNotesA,
      detailsButton,
    ]);

  const container = document.createElement('div');
  container.id = module.repoNameName;
  // container.style = 'padding-right:5%;padding-left:5%;margin-bottom:3%;';
  container.className = 'module-thumb';
  container.appendChild(title);
  container.appendChild(moduleInfo);

  return container;
};
