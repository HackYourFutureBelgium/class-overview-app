import renderModule from './module.js'
const cache = new Map();

export default (state, module) => {

  if (cache.has(module)) return cache.get(module);

  const title = document.createElement('h1');
  title.innerHTML = module.name;


  const status = document.createElement('text');
  status.style.fontWeight = 'bold';
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


  const studentsButton = document.createElement('button');
  studentsButton.innerHTML = 'All student assignments';
  studentsButton.onclick = async () => {
    const moduleEl = await renderModule(state, module);
    state.root.innerHTML = '';
    state.root.appendChild(moduleEl);
  }


  const moduleInfo = [status, boardA, repoA, studentsButton]
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
  container.style = 'padding-right:5%;padding-left:5%;margin-bottom:3%;';
  container.appendChild(title);
  container.appendChild(moduleInfo);

  cache.set(module, container);

  return container;

}


