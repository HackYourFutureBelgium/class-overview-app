import home from "./home.js";

export default (state) => {

  const container = document.createElement('div');
  container.className = 'header-footer';
  container.id = 'class-app';

  const title = document.createElement('h1');
  title.innerHTML = state.repoName
  title.className = 'header-footer-title';
  container.appendChild(title);

  container.appendChild(document.createElement('hr'));

  const header = document.createElement('div');
  header.className = 'header-footer-header';
  const overviewButton = document.createElement('button');
  overviewButton.innerHTML = 'Back to Overview';
  const toHome = async () => {
    state.currentModule = null;
    state.currentStudent = null;
    state.body.innerHTML = '';
    state.body.appendChild(await home(state));
  }
  overviewButton.onclick = toHome;
  header.appendChild(overviewButton);

  const repoA = document.createElement('a');
  repoA.href = "https://github.com/" + state.userName + "/" + state.repoName;
  repoA.target = "_blank";
  const repoButton = document.createElement('button');
  repoButton.innerHTML = 'to Class Repository'
  repoA.appendChild(repoButton);
  header.appendChild(repoA);

  const issuesA = document.createElement('a');
  issuesA.href = "https://github.com/" + state.userName + "/" + state.repoName + '/issues';
  issuesA.target = "_blank";
  const issuesButton = document.createElement('button');
  issuesButton.innerHTML = 'to Class Issues'
  issuesA.appendChild(issuesButton);
  header.appendChild(issuesA);

  const homeworkSubmissionA = document.createElement('a');
  homeworkSubmissionA.href = "https://github.com/hackyourfuturebelgium/homework-submission";
  homeworkSubmissionA.target = "_blank";
  const homeworkSubmissionButton = document.createElement('button');
  homeworkSubmissionButton.innerHTML = 'Homework Submission'
  homeworkSubmissionA.appendChild(homeworkSubmissionButton);
  header.appendChild(homeworkSubmissionA);

  container.appendChild(header);

  // container.appendChild(document.createElement('br'));
  container.appendChild(document.createElement('hr'));
  container.appendChild(document.createElement('hr'));

  container.appendChild(state.body);

  container.appendChild(document.createElement('hr'));
  container.appendChild(document.createElement('hr'));

  const footer = document.createElement('div');
  footer.className = 'header-footer-footer';

  const bottomOverviewButton = overviewButton.cloneNode(true);
  bottomOverviewButton.onclick = toHome;
  footer.appendChild(bottomOverviewButton);

  footer.appendChild(repoA.cloneNode(true));
  footer.appendChild(issuesA.cloneNode(true));
  footer.appendChild(homeworkSubmissionA.cloneNode(true));
  container.appendChild(footer);

  return container;

}
