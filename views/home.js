import displayMany from './display-many.js'
import moduleThumb from './module-thumb.js'
import studentThumb from './student-thumb.js'

let rendered = null;

export default async state => {

  try {
    history.pushState({}, null, window.location.pathname);
  } catch (err) { };

  if (rendered !== null) {
    return rendered;
  }

  const container = document.createElement('div');
  container.id = state.repoName;

  container.appendChild(await displayMany(state, state.modules, moduleThumb, 'Modules'));
  container.appendChild(document.createElement('hr'));
  container.appendChild(await displayMany(state, state.students, studentThumb, 'Students'));

  rendered = container;

  return container;

}

