import home from "./home.js";

export default (state) => {

  const container = document.createElement('div');

  const header = document.createElement('h1');
  header.innerHTML = state.repoName
  container.appendChild(header);

  container.appendChild(document.createElement('hr'));

  const overviewButton = document.createElement('button');
  overviewButton.innerHTML = 'Back to Overview';
  const toHome = async () => {
    state.currentModule = null;
    state.currentStudent = null;
    state.body.innerHTML = '';
    state.body.appendChild(await home(state));
  }
  overviewButton.onclick = toHome;
  container.appendChild(overviewButton);

  const repoA = document.createElement('a');
  repoA.href = "https://github.com/" + state.userName + "/" + state.repoName;
  repoA.target = "_blank";
  const repoButton = document.createElement('button');
  repoButton.innerHTML = 'to Class Repository'
  repoA.appendChild(repoButton);
  container.appendChild(repoA);

  const issuesA = document.createElement('a');
  issuesA.href = "https://github.com/" + state.userName + "/" + state.repoName + '/issues';
  issuesA.target = "_blank";
  const issuesButton = document.createElement('button');
  issuesButton.innerHTML = 'to Class Issues'
  issuesA.appendChild(issuesButton);
  container.appendChild(issuesA);


  // container.appendChild(document.createElement('br'));
  container.appendChild(document.createElement('hr'));
  container.appendChild(document.createElement('hr'));

  container.appendChild(state.body);

  container.appendChild(document.createElement('hr'));
  container.appendChild(document.createElement('hr'));

  const bottomOverviewButton = overviewButton.cloneNode(true);
  bottomOverviewButton.onclick = toHome;
  container.appendChild(bottomOverviewButton);

  container.appendChild(repoA.cloneNode(true));
  container.appendChild(issuesA.cloneNode(true));


  return container;

}
