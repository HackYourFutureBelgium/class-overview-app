import studentThumb from './student-thumb.js'
import moduleThumb from './module-thumb.js'
import assignments from './assignments.js'

export default async (state, student) => {
  history.pushState({}, null, window.location.pathname + '?student=' + student.userName);

  const container = document.createElement('div')
  container.className = 'students';

  const renderedStudentThumb = await studentThumb(state, student);
  container.appendChild(renderedStudentThumb);
  container.appendChild(document.createElement('hr'));

  for (const module of state.modules) {
    const renderedModuleThumb = moduleThumb(state, module);
    const renderedStudentAssignments = await assignments(module, student);


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
      container.appendChild(document.createElement('hr'));
      container.appendChild(renderedModuleThumb);
      container.appendChild(renderedStudentAssignments);

    }
    container.appendChild(permalinkButton);

    container.appendChild(renderedModuleThumb);
    container.appendChild(renderedStudentAssignments);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('hr'));
  }

  return container;
}
