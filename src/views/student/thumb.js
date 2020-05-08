import details from './details.js';
import renderAvatar from '../utils/render-avatar.js'
import linkButton from '../utils/link-button.js'
import listify from '../utils/listify.js'

export default (state, student) => {

  const studentImg = renderAvatar(student);

  const nameComponent = document.createElement('h2');
  nameComponent.innerHTML = student.name;
  // nameComponent.style = 'margin-top:0%';
  nameComponent.className = 'student-thumb-name';

  const githubLink = linkButton(
    student.userName,
    `https://github.com/${student.userName}?tab=repositories`
  );

  const personalPageLink = linkButton(
    'portfolio',
    `https://${student.userName}.github.io`
  );


  const bioLink = linkButton(
    'student bio',
    `https://github.com/${state.userName}/${state.repoName}/tree/master/student-bios/${student.userName}.md`
  );


  const detailsEl = document.createElement('button');
  detailsEl.innerHTML = 'details';
  detailsEl.onclick = () => {
    const studentEl = details(state, student);
    state.body.innerHTML = '';
    state.body.appendChild(studentEl);
  };

  const allIssues = linkButton(
    'all issues',
    `https://github.com/${state.userName}/${state.repoName}/issues?q=author%3A${student.userName}`
  );


  const className = (() => {
    if (student.className) {
      const classNumEl = document.createElement('text');
      classNumEl.innerHTML = student.className;
      return classNumEl;
    } else {
      return null;
    }
  })();

  const studentInfo = listify([
    nameComponent,
    className,
    githubLink,
    bioLink,
    personalPageLink,
    allIssues,
    detailsEl,
  ]);

  const container = document.createElement('div');
  container.id = student.name;
  // container.style = 'display:flex;flex-direction:row;align-items:center;padding-right:3%;'
  container.className = 'student-thumb';

  container.appendChild(studentImg);
  container.appendChild(studentInfo);

  return container;
};
