export default async (state, student, module) => {
  // if (student.views && student.views.specified) {
  //   return student.views.specified;
  // }

  const studentImg = document.createElement('img');
  studentImg.alt = student.name + ' - ' + student.userName;
  // studentImg.style = 'height:130px;width:130px;';
  studentImg.className = 'student-thumb-img';
  fetch('https://api.github.com/users/' + student.userName)
    .then(res => res.json())
    .then(userData => (studentImg.src = userData.avatar_url))
    .catch(err => console.log(err));

  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = student.name;
  // nameComponent.style = 'margin-top:0%';
  nameComponent.className = 'student-thumb-name';

  const githubButton = document.createElement('button');
  githubButton.innerHTML = 'github.com/' + student.userName;

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/' + student.userName;
  githubLink.target = '_blank';
  githubLink.appendChild(githubButton);



  const projectBoardFilterButton = document.createElement('button');
  projectBoardFilterButton.innerHTML = `Homework Board: ${module.repoName}`;
  const projectBoardFilter = document.createElement('a');
  projectBoardFilter.href = `https://github.com/${state.repoName}/${state.repoName}/projects/${module.board}?q=author%3A${student.userName}`;
  projectBoardFilter.target = '_blank';
  projectBoardFilter.appendChild(projectBoardFilterButton);

  const wednesdayCheckinsButton = document.createElement('button');
  wednesdayCheckinsButton.innerHTML = `${module.repoName} Check-ins`;
  const wednesdayCheckins = document.createElement('a');
  wednesdayCheckins.href = `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%3A${student.userName}+milestone%3A${module.repoName}+label%3Awednesday-check-in`;
  wednesdayCheckins.target = '_blank';
  wednesdayCheckins.appendChild(wednesdayCheckinsButton);

  const allIssuesButton = document.createElement('button');
  allIssuesButton.innerHTML = `All Issues for ${module.repoName}`;
  const allIssues = document.createElement('a');
  allIssues.href = `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%3A${student.userName}+milestone%3A${module.repoName}`;
  allIssues.target = '_blank';
  allIssues.appendChild(allIssuesButton);

  const className = (() => {
    if (typeof student.class === 'number') {
      const classNumEl = document.createElement('text');
      classNumEl.innerHTML = 'Class ' + student.class;
      return classNumEl;
    } else {
      return null;
    }
  })();

  const studentInfo = [nameComponent, className, projectBoardFilter, wednesdayCheckins, allIssues, githubLink,]
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

  const container = document.createElement('div');
  container.id = student.name;
  // container.style = 'display:flex;flex-direction:row;align-items:center;padding-right:3%;'
  container.className = 'student-thumb';

  container.appendChild(studentImg);
  container.appendChild(studentInfo);

  // if (!student.views) {
  //   student.views = {};
  //   student.views.specified = container;
  // } else {
  //   student.views.specified = container;
  // }
  return container;
};
