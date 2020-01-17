import studentThumb from './views/student-thumb.js'
import moduleThumb from './views/module-thumb.js'
import assignments from './views/assignments.js'
import renderStudent from './views/student.js'
import renderModule from './views/module.js'
import home from "./views/home.js"
import headerFooter from './views/header-footer.js'

export default async (state, container) => {


  if (!state.container) {
    state.container = container instanceof Element
      ? container
      : typeof container === 'string'
        ? document.getElementById(container)
        : document.createElement('div');
  }


  state.body = document.createElement('div');
  state.body.style = 'padding-top: 3%; padding-bottom: 3%;';

  state.container.appendChild(headerFooter(state));

  state.modules.forEach(module => {
    module.populated =
      (module.projects || module.exercises || module.assessments)
        ? true
        : false;
    module.views = {};
  });

  state.students.forEach(student => student.views = {});

  const urlParams = new URL(window.location.href).searchParams;

  const studentParam = urlParams.get("student");
  state.currentStudent = state.students
    .find(student => student.name === studentParam)
    || state.students
      .find(student => student.userName === studentParam);

  const moduleParam = urlParams.get("module");
  state.currentModule = state.modules
    .find(module => module.name === moduleParam)
    || state.modules
      .find(module => module.board === Number(moduleParam))
    || state.modules
      .find(module => module.repo === moduleParam);


  if (state.currentStudent && state.currentModule) {
    state.body.appendChild(await studentThumb(state, state.currentStudent));
    state.body.appendChild(document.createElement('hr'));
    state.body.appendChild(await moduleThumb(state, state.currentModule));
    state.body.appendChild(await assignments(state.currentModule, state.currentStudent));
  } else if (state.currentStudent) {
    state.body.appendChild(await renderStudent(state, state.currentStudent));
  } else if (state.currentModule) {
    state.body.appendChild(await renderModule(state, state.currentModule));
  } else {
    state.body.appendChild(await home(state));
  }


  return state;
}
