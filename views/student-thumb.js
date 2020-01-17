import renderStudent from './student.js'

export default async (state, student) => {

  if (student.views.thumb) {
    return student.views.thumb;
  }

  const studentImg = document.createElement('img');
  studentImg.alt = student.name + ' - ' + student.userName;
  studentImg.style = 'height:130px;width:130px;padding-top:3%;';
  try {
    const userObjPromise = await fetch('https://api.github.com/users/' + student.userName);
    const userData = await userObjPromise.json();
    studentImg.src = userData.avatar_url;
  } catch (err) {
    console.log('--------', err);
  };


  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = student.name;
  nameComponent.style = 'margin-top:0%;'


  const githubButton = document.createElement('button');
  githubButton.innerHTML = 'github.com/' + student.userName;

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/' + student.userName;
  githubLink.target = '_blank';
  githubLink.appendChild(githubButton);


  const personalPageButton = document.createElement('button');
  personalPageButton.innerHTML = student.userName + '.github.io';

  const personalPageLink = document.createElement('a');
  personalPageLink.href = 'https://' + student.userName + '.github.io';
  personalPageLink.target = '_blank';
  personalPageLink.appendChild(personalPageButton);


  const bioButton = document.createElement('button');
  bioButton.innerHTML = 'Student bio';

  const bioLink = document.createElement('a');
  bioLink.href = `https://github.com/${state.userName}/${state.repoName}/tree/master/student-bios/${student.userName}.md`;
  bioLink.target = '_blank';
  bioLink.appendChild(bioButton);

  const allAssignments = document.createElement('button');
  allAssignments.innerHTML = 'Review all assignments';
  allAssignments.onclick = async () => {
    const studentEl = await renderStudent(state, student);
    state.body.innerHTML = '';
    state.body.appendChild(studentEl);
  }

  const studentInfo = [nameComponent, allAssignments, githubLink, personalPageLink, bioLink]
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
  container.style = 'display:flex;flex-direction:row;margin-bottom:2%;margin-right:5%;'

  container.appendChild(studentImg);
  container.appendChild(studentInfo);

  student.views.thumb = container;
  return container;

}
