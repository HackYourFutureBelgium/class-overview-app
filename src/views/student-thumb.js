import renderStudent from './student.js';

export default async (state, student) => {
  if (student.views && student.views.thumb) {
    return student.views.thumb;
  }

  const studentImg = document.createElement('img');
  studentImg.alt = student.name + ' - ' + student.userName;
  // studentImg.style = 'height:130px;width:130px;';
  studentImg.className = 'student-thumb-img';
  fetch('https://api.github.com/users/' + student.userName)
    .then(res => res.json())
    .then(userData => (studentImg.src = userData.avatar_url))
    .catch(err => console.log(err));

  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = student.name;
  // nameComponent.style = 'margin-top:0%';
  nameComponent.className = 'student-thumb-name';

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

  // const allAssignments = document.createElement('button');
  // allAssignments.innerHTML = 'Review all assignments';
  // allAssignments.onclick = async () => {
  //   const studentEl = await renderStudent(state, student);
  //   state.body.innerHTML = '';
  //   state.body.appendChild(studentEl);
  // };

  const allIssuesButton = document.createElement('button');
  allIssuesButton.innerHTML = 'All Issues';

  const allIssues = document.createElement('a');
  allIssues.href = `https://github.com/${state.repoName}/${state.repoName}/issues?q=author%${student.userName}`;
  allIssues.target = '_blank';
  allIssues.appendChild(allIssuesButton);

  const className = (() => {
    if (typeof student.class === 'number') {
      const classNumEl = document.createElement('text');
      classNumEl.innerHTML = 'Class ' + student.class;
      return classNumEl;
    } else {
      return null;
    }
  })();
  // const studentInfo = [nameComponent, className, allAssignments, githubLink, personalPageLink, bioLink]
  const studentInfo = [
    nameComponent,
    className,
    allIssues,
    githubLink,
    personalPageLink,
    bioLink,
  ]
    .filter(item => item instanceof Element)
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
  // container.style = 'display:flex;flex-direction:row;align-items:center;padding-right:3%;'
  container.className = 'student-thumb';

  container.appendChild(studentImg);
  container.appendChild(studentInfo);

  if (!student.views) {
    student.views = {};
    student.views.thumb = container;
  } else {
    student.views.thumb = container;
  }
  return container;
};
