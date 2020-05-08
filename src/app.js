import studentThumb from './views/student/thumb.js'
import moduleThumb from './views/module/thumb.js'
import studentDetails from './views/student/details.js'
import moduleDetails from './views/module/details.js'
import randomizer from './views/randomizer.js'
import home from "./views/home.js"
import linksBar from './views/links-bar.js'

export default (state, container) => {

  // main view container
  if (!state.container) {
    state.container = container instanceof Element
      ? container
      : typeof container === 'string'
        ? document.getElementById(container)
        : document.createElement('div');
  }

  state.body = document.createElement('div');
  state.body.id = 'body';
  state.body.style = 'padding-top: 3%; padding-bottom: 3%;';

  const title = document.createElement('h1');
  title.innerHTML = state.repoName;
  title.className = 'header-footer-title';
  state.container.appendChild(title);

  state.container.appendChild(linksBar(state));
  state.container.appendChild(state.body);
  state.container.appendChild(linksBar(state));

  state.container.appendChild(document.createElement('br'));


  // process students
  state.students.forEach(student => student.views = {});

  const urlParams = new URL(window.location.href).searchParams;

  const randomizerParam = urlParams.get("randomizer");
  if (randomizerParam) {
    state.currentModule = null;
    state.currentStudent = null;
    state.body.innerHTML = '';
    state.body.appendChild(randomizer(state));
    return state;
  }

  const studentParam = urlParams.get("student");
  state.currentStudent = state.students
    .find(student => student.name === studentParam)
    || state.students
      .find(student => student.userName === studentParam);

  const moduleParam = urlParams.get("module");
  state.currentModule = state.modules
    .find(module => module.repoName === moduleParam);

  const coachParam = urlParams.get("coach");
  state.currentCoach = state.coaches
    .find(coach => coach.userName === coachParam);


  if (state.currentStudent && state.currentModule) {
    state.body.appendChild(studentThumb(state, state.currentStudent));
    state.body.appendChild(document.createElement('hr'));
    state.body.appendChild(moduleThumb(state, state.currentModule));
  } else if (state.currentStudent) {
    state.body.appendChild(studentDetails(state, state.currentStudent));
  } else if (state.currentModule) {
    state.body.appendChild(moduleDetails(state, state.currentModule));
  } else {
    state.body.appendChild(home(state));
  }


  return state;
}
