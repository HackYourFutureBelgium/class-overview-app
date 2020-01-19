export default (state, coach) => {

  if (coach.views && coach.views.thumb) {
    return coach.views.thumb;
  }

  const nameComponent = document.createElement('code');
  nameComponent.innerHTML = coach.name + ' : ';
  // nameComponent.style = 'font-size: 1.5em';
  nameComponent.className = 'coach-thumb-name';

  const githubButton = document.createElement('button');
  githubButton.innerHTML = 'github.com/' + coach.userName;

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/' + coach.userName;
  githubLink.target = '_blank';
  githubLink.appendChild(githubButton);

  const bioButton = document.createElement('button');
  bioButton.innerHTML = 'Coach bio';

  const bioLink = document.createElement('a');
  bioLink.href = `https://github.com/${state.userName}/${state.repoName}/tree/master/coach-bios/${coach.userName}.md`;
  bioLink.target = '_blank';
  bioLink.appendChild(bioButton);

  // const coachInfo = [nameComponent, githubLink, bioLink]
  //   .map(item => {
  //     const li = document.createElement('li');
  //     li.appendChild(item);
  //     return li;
  //   })
  //   .reduce((ul, li) => {
  //     ul.appendChild(li);
  //     return ul;
  //   }, document.createElement('ul'));

  const container = document.createElement('div');
  container.className = 'coach-thumb';
  container.id = coach.name;

  container.appendChild(nameComponent);
  container.appendChild(bioLink);
  container.appendChild(githubLink);

  if (!coach.views) {
    coach.views = {};
  }
  coach.views.thumb = container;
  return container;

}
