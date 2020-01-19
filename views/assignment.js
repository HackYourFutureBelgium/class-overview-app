// const assignmentCache = new Map();
// const containerCache = new Map();

export default (state, assignment, student) => {

  const container = document.createElement('li');
  // container.style = 'padding-bottom:1%';
  container.className = 'assignment';

  const title = document.createElement('h3');
  // title.style.display = 'inline';
  title.className = 'assignment-title';
  const titleText = document.createTextNode(assignment.name + ': ');
  title.appendChild(titleText);
  container.appendChild(title);

  const preRepoURL = assignment.source
    ? assignment.source
    : 'https://github.com/' + student.userName + '/' + (assignment.repo || assignment.name);
  const repoURL = preRepoURL.replace('<user-name>', student.userName).replace('<class-name>', state.repoName);

  if (assignment.source !== false) {
    const repoButton = document.createElement('button');
    repoButton.innerHTML = 'review source';
    const repoA = document.createElement('a');
    repoA.target = '_blank';
    repoA.href = repoURL;
    repoA.appendChild(repoButton);
    container.appendChild(repoA);
  }

  const preLiveURL = typeof assignment.live === 'string'
    ? assignment.live
    : 'https://' + student.userName + '.github.io/' + (assignment.repo || assignment.name);
  const liveURL = preLiveURL.replace('<user-name>', student.userName).replace('<class-name>', state.repoName);


  // use the directly as a review link
  // no guarantee an existence-check will work
  if (typeof assignment.live === 'string') {
    const liveButton = document.createElement('button');
    liveButton.innerHTML = 'live assignment';
    const liveA = document.createElement('a');
    liveA.target = '_blank';
    liveA.href = liveURL;
    liveA.appendChild(liveButton);
    container.appendChild(liveA);

    // if true or not present
    // generate a live link from repo/name & username
  } else if (assignment.live === true) {

    const liveButton = document.createElement('button');
    liveButton.innerHTML = 'live project';
    const liveA = document.createElement('a');
    liveA.target = '_blank';
    liveA.href = liveURL;
    liveA.appendChild(liveButton);
    container.appendChild(liveA);
  };


  // assume all endpoints exist if the repo exists
  if (Array.isArray(assignment.endpoints) && assignment.endpoints.length > 0) {
    // eventually be able to configure endpoints with more detail
    const endpointsUl = assignment.endpoints
      .map(directory => {
        const directoryButton = document.createElement('button');
        directoryButton.innerHTML = 'review directory';


        const directoryLi = document.createElement('li');
        directoryLi.appendChild(document.createTextNode(directory));

        if (assignment.source !== false) {
          const directoryA = document.createElement('a');
          directoryA.target = '_blank';
          directoryA.href = repoURL + '/tree/master/' + directory;
          directoryA.appendChild(directoryButton);
          directoryLi.appendChild(directoryA);
        }

        if (assignment.live) {
          const liveButton = document.createElement('button');
          liveButton.innerHTML = 'live';
          const liveA = document.createElement('a');
          liveA.target = '_blank';
          liveA.href = liveURL + '/' + directory;
          liveA.appendChild(liveButton);
          directoryLi.appendChild(liveA);
        }

        return directoryLi;
      })
      .reduce((ul, li) => {
        ul.appendChild(li);
        return ul;
      }, document.createElement('ul'));

    container.appendChild(endpointsUl);
  }


  // keep testing separate from potential fullstack deployments
  // github pages needs to be on for reports
  if (assignment.reports && assignment.reports.length > 0) {
    const ul = document.createElement('ul');
    for (const reportPath of assignment.reports) {

      const reportLi = document.createElement('li');

      const reportPathEl = document.createElement('text');
      reportPathEl.innerHTML = reportPath + ": ";
      reportLi.appendChild(reportPathEl);

      const reportButton = document.createElement('button');
      reportButton.innerHTML = 'log report';
      reportButton.onclick = async () => {
        console.group(student.name + ': ' + assignment.name + ' -> ' + reportPath);
        console.log(await (async () => {
          const res = await fetch(liveURL + '/' + reportPath);
          try {
            return await res.clone().json();
          } catch (err) {
            return await res.text();
          }
        })());
        console.groupEnd();
      }
      reportLi.appendChild(reportButton);

      // container.appendChild(reportLi);
      ul.appendChild(reportLi)
    };
    container.appendChild(ul);
  }


  return container;

}
