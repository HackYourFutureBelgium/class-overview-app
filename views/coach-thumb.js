const cache = new Map();

export default async (state, coach) => {

  if (cache.has(coach)) {
    return cache.get(coach);
  }

  const coachImg = document.createElement('img');
  coachImg.alt = coach.name + ' - ' + coach.userName;
  coachImg.style = 'height:130px;width:130px;';
  try {
    const userObjPromise = await fetch('https://api.github.com/users/' + coach.userName);
    const userData = await userObjPromise.json();
    coachImg.src = userData.avatar_url;
  } catch (err) {
    console.log('--------', err);
  };


  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = coach.name;


  const githubButton = document.createElement('button');
  githubButton.innerHTML = 'github.com/' + coach.userName;

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/' + coach.userName;
  githubLink.target = '_blank';
  githubLink.appendChild(githubButton);


  const coachInfo = [nameComponent, githubLink]
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
  container.id = coach.name;
  container.style = 'display:flex;flex-direction:row;padding-bottom:5%;padding-right:5%'

  container.appendChild(coachImg);
  container.appendChild(coachInfo);

  cache.set(coach, container);
  return container;

}
