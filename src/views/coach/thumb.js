export default (state, coach) => {
  if (coach.views && coach.views.thumb) {
    return coach.views.thumb;
  }

  const coachImg = document.createElement('img');
  coachImg.alt = coach.name + ' - ' + coach.userName;
  // coachImg.style = 'height:130px;width:130px;';
  coachImg.className = 'student-thumb-img';
  fetch('https://api.github.com/users/' + coach.userName)
    .then(res => res.json())
    .then(userData => (coachImg.src = userData.avatar_url))
    .catch(err => console.log(err));

  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = coach.name;
  // nameComponent.style = 'margin-top:0%';
  nameComponent.className = 'coach-thumb-name';

  const githubButton = document.createElement('button');
  githubButton.innerHTML = 'github.com/' + coach.userName;

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/' + coach.userName;
  githubLink.target = '_blank';
  githubLink.appendChild(githubButton);

  const bioButton = document.createElement('button');
  bioButton.innerHTML = 'coach bio';

  const bioLink = document.createElement('a');
  bioLink.href = `https://github.com/${state.userName}/${state.repoName}/tree/master/coach-bios/${coach.userName}.md`;
  bioLink.target = '_blank';
  bioLink.appendChild(bioButton);


  const allIssuesButton = document.createElement('button');
  allIssuesButton.innerHTML = 'assigned issues';

  const allIssues = document.createElement('a');
  allIssues.href =
    `https://github.com/${state.userName}/${state.repoName}/issues?q=assignee%3A${coach.userName}`;
  allIssues.target = '_blank';
  allIssues.appendChild(allIssuesButton);

  const className = (() => {
    if (typeof coach.class === 'number') {
      const classNumEl = document.createElement('text');
      classNumEl.innerHTML = 'Class ' + coach.class;
      return classNumEl;
    } else {
      return null;
    }
  })();

  const roleType = (() => {
    if (typeof coach.role === 'string') {
      const roleTypeEl = document.createElement('text');
      roleTypeEl.innerHTML = coach.role;
      return roleTypeEl;
    } else {
      return null;
    }
  })();
  console.log(roleType, coach.role);

  const coachInfo = [
    nameComponent,
    roleType,
    assignedIssues,
    className,
    githubLink,
    bioLink,
  ]
    .filter(item => item instanceof Element)
    .map(item => {
      const li = document.createElement('li');
      li.appendChild(item);
      return li;
    })
    .reduce((ul, li) => {
      ul.appendChild(li);
      return ul;
    }, document.createElement('ul'));
  coachInfo.style = 'text-align: left';

  coach.modules.forEach(module => {
    const li = document.createElement('li');
    const moduleButton = document.createElement('button');
    moduleButton.innerHTML = '- ' + module;
    const moduleA = document.createElement('a');
    moduleA.href =
      'https://' +
      state.userName +
      '.github.io/' +
      state.repoName +
      '?module=' +
      module;
    moduleA.target = '_blank';
    moduleA.appendChild(moduleButton);
    li.appendChild(moduleA);
    coachInfo.appendChild(li);
  });

  const container = document.createElement('div');
  container.id = coach.name;
  // container.style = 'display:flex;flex-direction:row;align-items:center;padding-right:3%;'
  container.className = 'student-thumb';

  container.appendChild(coachImg);
  container.appendChild(coachInfo);

  if (coach.views) {
    coach.views.thumb = container;
  } else {
    coach.views = { thumb: container };
  }
  return container;
};
