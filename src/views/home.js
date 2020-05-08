import displayMany from './utils/display-many.js';
import moduleThumb from './module/thumb.js';
import studentThumb from './student/thumb.js';
import coachThumb from './coach/thumb.js';

export default (state) => {
  // try {
  //   history.pushState({}, null, window.location.pathname);
  // } catch (err) { };

  const container = document.createElement('div');
  container.className = 'home';

  container.appendChild(
    displayMany(
      state.students.map(student => studentThumb(state, student)),
      'Students: ' + state.repoName
    )
  );
  container.appendChild(document.createElement('hr'));
  container.appendChild(document.createElement('hr'));
  container.appendChild(
    displayMany(
      state.coaches.map(coach => coachThumb(state, coach)),
      'Coaches: ' + state.repoName
    )
  );
  container.appendChild(document.createElement('hr'));
  container.appendChild(document.createElement('hr'));
  container.appendChild(
    displayMany(
      state.modules.map(module => moduleThumb(state, module)),
      'Modules: ' + state.repoName
    )
  );

  return container;
};
