const CORSing = 'https://cors-anywhere.herokuapp.com/';

const cache = new Map();

export default async (state, assignment, student) => {

  // won't recheck for every navigation
  // only when page is refreshed
  if (cache.has({ assignment, student })) {
    return cache.get({ assignment, student });
  }

  const container = document.createElement('li');
  container.style = 'padding-bottom:1%';

  const title = document.createElement('h3');
  title.style.display = 'inline';
  const titleText = document.createTextNode(assignment.name + ': ');
  title.appendChild(titleText);
  container.appendChild(title);

  const preRepoURL = assignment.source
    ? assignment.source
    : 'https://github.com/' + student.userName + '/' + (assignment.repo || assignment.name);
  const repoURL = preRepoURL.replace('<user-name>', student.userName).replace('<class-name>', state.repoName);

  let resRepo = null;
  try {
    resRepo = await fetch(CORSing + repoURL);
  } catch (err) {
    const repoText = document.createElement('text');
    repoText.innerHTML = '-- ' + err.message + ' --';
    container.appendChild(repoText);
    return container;
  }

  if (resRepo && resRepo.ok) {
    const repoButton = document.createElement('button');
    repoButton.innerHTML = 'visit repo';
    const repoA = document.createElement('a');
    repoA.target = '_blank';
    repoA.href = repoURL;
    repoA.appendChild(repoButton);
    container.appendChild(repoA);

    // assume all directories exist if the repo exists
    if (Array.isArray(assignment.directories) && assignment.directories.length > 0) {
      const directoriesUl = assignment.directories
        .map(directory => {
          const directoryButton = document.createElement('button');
          directoryButton.innerHTML = 'review directory';

          const directoryA = document.createElement('a');
          directoryA.target = '_blank';
          directoryA.href = hrefURL + '/tree/master/' + directory;
          directoryA.appendChild(directoryButton);

          const directoryLi = document.createElement('li');
          directoryLi.appendChild(document.createTextNode(directory));
          directoryLi.appendChild(directoryA);
          return directoryLi;
        })
        .reduce((ul, li) => {
          ul.appendChild(li);
          return ul;
        }, document.createElement('ul'));

      container.appendChild(directoriesUl);
    }
  } else {
    const repoText = document.createElement('text');
    repoText.innerHTML = '-- ' + resRepo.status + ' --';
    container.appendChild(repoText);
    return container;
  }

  const preLiveURL = typeof assignment.live === 'string'
    ? assignment.live
    : 'https://' + student.userName + '.github.io/' + (assignment.repo || assignment.name);
  const liveURL = preLiveURL.replace('<user-name>', student.userName).replace('<class-name>', state.repoName);


  // use the directly as a review link
  // no guarantee an existence-check will work
  if (typeof assignment.live === 'string') {
    const liveButton = document.createElement('button');
    liveButton.innerHTML = 'review assignment';
    const liveA = document.createElement('a');
    liveA.target = '_blank';
    liveA.href = liveURL;
    liveA.appendChild(liveButton);
    container.appendChild(liveA);

    // if true or not present
    // generate a live link from repo/name & username
  } else if (assignment.live === true) {

    let resLive = null;
    try {
      resLive = await fetch(CORSing + liveURL);
    } catch (err) {
      const deadLinkEl = document.createElement('text');
      deadLinkEl.innerHTML = '-- ' + err.message + ' --';
      container.appendChild(deadLinkEl);
      return container;
    }

    if (resLive && resLive.ok) {
      const liveButton = document.createElement('button');
      liveButton.innerHTML = 'live project';
      const liveA = document.createElement('a');
      liveA.target = '_blank';
      liveA.href = liveURL;
      liveA.appendChild(liveButton);
      container.appendChild(liveA);
    } else {
      const liveText = document.createElement('text');
      liveText.innerHTML = '-- ' + resLive.status + ' --';
      container.appendChild(liveText);
      return container;
    }
  };

  // keep testing separate from potential fullstack deployments
  if (assignment.reports && assignment.reports.length > 0) {
    const ul = document.createElement('ul');
    for (const reportPath of assignment.reports) {

      const reportLi = document.createElement('li');

      const reportPathEl = document.createElement('text');
      reportPathEl.innerHTML = reportPath + ": ";
      reportLi.appendChild(reportPathEl);

      let resReport = null;
      try {
        resReport = await fetch(CORSing + liveURL + '/' + reportPath);

      } catch (err) {
        const statusText = document.createElement('text');
        statusText.innerHTML = '-- ' + err.message + ' --';
        reportLi.appendChild(statusText);
        continue;
      }

      if (resReport && resReport.ok) {
        const reportButton = document.createElement('button');
        reportButton.innerHTML = 'log report';
        reportButton.onclick = async () => {
          console.group(student.name + ': ' + assignment.name + ' -> ' + reportPath);
          console.log(await (async () => {
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
      } else {
        const repoRTText = document.createElement('text');
        repoRTText.innerHTML = '-- ' + resReport.status + ' --';
        container.appendChild(repoRTText);
        return container;
      }
    };
    container.appendChild(ul);
  }

  cache.set({ assignment, student }, container);

  return container;

}
