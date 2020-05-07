import displayMany from './display-many.js';
import moduleThumb from './module-thumb.js';
import studentThumb from './student-thumb.js';

export default async state => {
  // try {
  //   history.pushState({}, null, window.location.pathname);
  // } catch (err) { };

  const container = document.createElement('div');
  container.className = 'home';

  container.appendChild(
    await displayMany(state, state.modules, moduleThumb, 'Modules')
  );
  container.appendChild(document.createElement('hr'));
  container.appendChild(document.createElement('hr'));
  container.appendChild(
    await displayMany(state, state.students, studentThumb, 'Students')
  );

  return container;
};
