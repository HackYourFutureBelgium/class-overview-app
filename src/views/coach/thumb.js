import details from './details.js';
import renderAvatar from '../utils/render-avatar.js'
import linkButton from '../utils/link-button.js'
import listify from '../utils/listify.js'

export default (state, coach) => {

  const coachImg = renderAvatar(coach);

  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = coach.name;
  // nameComponent.style = 'margin-top:0%';
  nameComponent.className = 'student-thumb-name';

  const githubLink = linkButton(
    'on github',
    `https://github.com/${coach.userName}`
  );

  const bioLink = linkButton(
    'coach bio',
    `https://github.com/${state.userName}/${state.repoName}/tree/master/coach-bios/${coach.userName}.md`
  );

  const detailsButton = document.createElement('button');
  detailsButton.innerHTML = 'details';
  detailsButton.onclick = () => {
    const moduleEl = details(state, coach);
    state.body.innerHTML = '';
    state.body.appendChild(moduleEl);
  };

  const assignedIssues = linkButton(
    'assigned issues',
    `https://github.com/${state.userName}/${state.repoName}/issues?q=assignee%3A${coach.userName}`
  );


  const modules = coach.modules
    .map(next => {
      const text = document.createElement('text');
      text.innerHTML = `<code>${next.repoName}</code>`;
      return text;
    });

  const userName = document.createElement('text');
  userName.innerHTML = coach.userName;


  const coachInfo = listify([
    nameComponent,
    userName,
    githubLink,
    // bioLink,
    assignedIssues,
    detailsButton,
    ...modules,
  ]);

  const container = document.createElement('div');
  container.id = coach.name;
  // container.style = 'display:flex;flex-direction:row;align-items:center;padding-right:3%;'
  container.className = 'student-thumb';

  container.appendChild(coachImg);
  container.appendChild(coachInfo);

  return container;
};
