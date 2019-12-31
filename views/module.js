import studentThumb from './student-thumb.js'
import moduleThumb from './module-thumb.js'
import assignments from './assignments.js'

export default async (state, module) => {

  try {
    history.pushState({}, null, window.location.pathname + '?module=' + module.name);
  } catch (err) { };

  const container = document.createElement('div');

  const renderedModuleThumb = await moduleThumb(state, module)
  container.appendChild(renderedModuleThumb);

  for (const student of state.students) {
    const renderedStudentThumb = await studentThumb(state, student);
    const renderedStudentAssignments = await assignments(module, student)


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

    // css-fix this later
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));
    container.appendChild(renderedStudentThumb);
    container.appendChild(renderedStudentAssignments);
    container.appendChild(document.createElement('br'));
  }

  return container;
}
