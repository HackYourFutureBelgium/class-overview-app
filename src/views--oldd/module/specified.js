export default (state, module, user) => {
  // if (module.views && module.views.thumb) return module.views.thumb;

  const title = document.createElement('h1');
  title.innerHTML = module.name || module.repo;

  const status = document.createElement('text');
  // status.style.fontWeight = 'bold';
  status.className = 'module-thumb-status';
  status.innerHTML = module.status;

  const boardButton = document.createElement('button');
  boardButton.innerHTML = 'Homework Board: ' + user.userName;
  const boardA = document.createElement('a');
  boardA.target = '_blank';
  boardA.href = `https://github.com/${state.repoName}/${state.repoName}/projects/${module.board}?q=author%3A${user.userName}`;
  boardA.appendChild(boardButton);

  const projectBoardFilterButton = document.createElement('button');
  projectBoardFilterButton.innerHTML = `${user.userName}'s Wednesday Check-ins`;
  const projectBoardFilter = document.createElement('a');
  projectBoardFilter.href = `https://github.com/${state.repoName}/${state.repoName}/projects/${module.board}?q=author%3A${user.userName}`;
  projectBoardFilter.target = '_blank';
  projectBoardFilter.appendChild(projectBoardFilterButton);

  const repoButton = document.createElement('button');
  repoButton.innerHTML = 'Module Repo';
  const repoA = document.createElement('a');
  repoA.target = '_blank';
  const repoName = module.repo || module.name;
  repoA.href = `https://github.com/${module.userName || state.userName}/${repoName}`;
  repoA.appendChild(repoButton);

  const allIssuesButton = document.createElement('button');
  allIssuesButton.innerHTML = `All of ${user.userName}'s Issues`;
  const allIssues = document.createElement('a');
  allIssues.target = '_blank';
  allIssues.href = `https://github.com/${state.userName}/${state.repoName}/issues?q=milestone%3A${module.repo}`;
  allIssues.appendChild(allIssuesButton);


  // const moduleInfo = [status, usersButton, boardA, repoA, sharedNotesA]
  const moduleInfo = [status, boardA, allIssues, repoA,]
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
  container.id = module.name;
  // container.style = 'padding-right:5%;padding-left:5%;margin-bottom:3%;';
  container.className = 'module-thumb';
  container.appendChild(title);
  container.appendChild(moduleInfo);

  // if (!module.views) {
  //   module.views = {};
  // }
  // module.views.specified = container;

  return container;
};
