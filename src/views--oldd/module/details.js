import studentThumb from './student-thumb.js'
import coaches from './coaches.js'
import moduleThumb from './module-thumb.js'
import assignments from './assignments.js'

export default async (state, module) => {

  try {
    history.pushState({}, null, window.location.pathname + '?module=' + module.name);
  } catch (err) { };

  const container = document.createElement('div');
  container.className = 'module';
  container.id = module.name;

  const renderedModuleThumb = moduleThumb(state, module)
  container.appendChild(renderedModuleThumb);

  if (module.coaches && module.coaches.length > 0) {
    container.appendChild(coaches(state, module.coaches));
  }

  container.appendChild(document.createElement('hr'));

  for (const student of state.students) {
    container.appendChild(document.createElement('hr'));

    const renderedStudentThumb = await studentThumb(state, student);
    const renderedStudentAssignments = await assignments(module, student);

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
    container.appendChild(document.createElement('hr'));

  }

  return container;
}
