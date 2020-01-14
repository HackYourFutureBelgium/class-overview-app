import studentThumb from './student-thumb.js'
// import coachThumb from './coach-thumb.js'
import moduleThumb from './module-thumb.js'
import assignments from './assignments.js'

export default async (state, module) => {

  try {
    history.pushState({}, null, window.location.pathname + '?module=' + module.name);
  } catch (err) { };

  // todo: only load module assignments when page is visited

  const container = document.createElement('div');

  const renderedModuleThumb = moduleThumb(state, module)
  container.appendChild(renderedModuleThumb);

  if (module.coaches && module.coaches.length > 0) {
    const coachContainer = document.createElement('div');
    coachContainer.style = "padding-right: 5%; padding-left: 5%; margin-bottom: 3%;"

    const coachesHead = document.createElement('h2');
    coachesHead.innerHTML = "Coaches";
    coachContainer.appendChild(coachesHead);
    const coachesList = module.coaches
      .map(coach => {
        // container.appendChild(await coachThumb(state, coach));
        const nameComponent = document.createElement('code');
        nameComponent.innerHTML = coach.name + ': ';

        const githubButton = document.createElement('button');
        githubButton.innerHTML = coach.userName;

        const githubLink = document.createElement('a');
        githubLink.href = 'https://github.com/' + coach.userName;
        githubLink.target = '_blank';
        githubLink.appendChild(githubButton);

        const coachLi = document.createElement('li');
        coachLi.appendChild(nameComponent);
        coachLi.appendChild(githubLink);

        return coachLi;
      })
      .reduce((ul, li) => {
        ul.appendChild(li);
        return ul;
      }, document.createElement('ul'));

    coachContainer.appendChild(coachesList);
    container.appendChild(coachContainer);
  }

  for (const student of state.students) {
    studentThumb(state, student)
      .then(renderedStudentThumb => {
        const renderedStudentAssignments = assignments(module, student)


        container.appendChild(document.createElement('hr'));

        const permalinkButton = document.createElement('button');
        permalinkButton.innerHTML = `review only ${student.userName}'s ${module.name} assignments`;
        permalinkButton.onclick = () => {

          try {
            history.pushState({}, null, `${window.location.pathname}?student=${student.userName}&module=${module.name}`);
          } catch (err) { };

          container.innerHTML = '';
          container.appendChild(renderedStudentThumb);
          container.appendChild(document.createElement('hr'));
          container.appendChild(renderedModuleThumb);
          container.appendChild(renderedStudentAssignments);

        }
        container.appendChild(permalinkButton);

        container.appendChild(document.createElement('br'));
        container.appendChild(document.createElement('br'));
        container.appendChild(renderedStudentThumb);
        container.appendChild(renderedStudentAssignments);
        container.appendChild(document.createElement('br'));
      })
  }

  return container;
}
