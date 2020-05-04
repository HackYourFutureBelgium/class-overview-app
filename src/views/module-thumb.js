import renderModule from './module.js'

export default (state, module) => {

  if (module.views && module.views.thumb) return module.views.thumb;

  const title = document.createElement('h1');
  title.innerHTML = module.name;


  const status = document.createElement('text');
  // status.style.fontWeight = 'bold';
  status.className = 'module-thumb-status';
  status.innerHTML = module.status;


  const boardButton = document.createElement('button');
  boardButton.innerHTML = 'Homework Board';

  const boardA = document.createElement('a');
  boardA.target = '_blank';
  boardA.href = "https://github.com/" + state.userName + "/" + state.repoName + "/projects/" + module.board;
  boardA.appendChild(boardButton);


  const repoButton = document.createElement('button');
  repoButton.innerHTML = 'Module Repo';

  const repoA = document.createElement('a');
  repoA.target = '_blank';
  const repoName = module.repo || module.name;
  repoA.href = "https://github.com/" + (module.userName || state.userName) + "/" + repoName;
  repoA.appendChild(repoButton);


  const sharedNotesButton = document.createElement('button');
  sharedNotesButton.innerHTML = 'Shared notes';

  const sharedNotesA = document.createElement('a');
  sharedNotesA.target = '_blank';
  sharedNotesA.href = `https://github.com/${state.userName}/${state.repoName}/tree/master/shared-notes/${module.number}-${module.name}.md`;
  sharedNotesA.appendChild(sharedNotesButton);


  const studentsButton = document.createElement('button');
  studentsButton.innerHTML = 'All student assignments';
  studentsButton.onclick = async () => {
    const moduleEl = await renderModule(state, module);
    state.body.innerHTML = '';
    state.body.appendChild(moduleEl);
  }


  const moduleInfo = [status, studentsButton, boardA, repoA, sharedNotesA]
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

  if (!module.views) {
    module.views = {};
  }
  module.views.thumb = container;

  return container;

}

