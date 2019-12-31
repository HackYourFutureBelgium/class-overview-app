import studentThumb from './views/student-thumb.js'
import moduleThumb from './views/module-thumb.js'
import assignments from './views/assignments.js'
import renderStudent from './views/student.js'
import renderModule from './views/module.js'
import home from "./views/home.js"

export default async (state, root) => {

  if (!state.root) {
    state.root = root instanceof Element
      ? root
      : typeof root === 'string'
        ? document.getElementById(root)
        : document.createElement('div');
  }

  if (state.currentStudent && state.currentModule) {
    state.root.appendChild(await studentThumb(state.currentStudent));
    state.root.appendChild(document.createElement('hr'));
    state.root.appendChild(await moduleThumb(state.currentModule));
    state.root.appendChild(await assignments(state.currentModule, state.currentStudent));
  } else if (state.currentStudent) {
    state.root.appendChild(await renderStudent(state, state.currentStudent));
  } else if (state.currentModule) {
    state.root.appendChild(await renderModule(state, state.currentModule));
  } else {
    state.root.appendChild(await home(state));
  }


  return state.root;
}
