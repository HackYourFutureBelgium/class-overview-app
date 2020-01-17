import assignment from './assignment.js'

export default async (module, student) => {

  if (module.status === 'to do') {
    const container = document.createElement('p');
    container.innerHTML = 'This module has not started yet';
    return container;
  }

  if (!module.populated) {
    module.populated = true;

    const url = 'https://hackyourfuture.be/' + module.name + '/assignments.json'
    // const url = `https://${state.userName}.github.io/${module.name}/assignments.json`
    try {
      const res = await fetch(url)
      const assignments = await res.json();
      Object.assign(module, assignments);
    } catch (err) {
      console.log(err);
      const errEl = document.createElement('p');
      errEl.innerHTML = err + ': ' + err.message;
      errEl.style.color = 'red';
      student.views[module.name] = errEl;
      module.views.thumb.appendChild(errEl.cloneNode());
      return errEl;
    }
  }

  const assignmentsUl = document.createElement('ul');

  if (module.projects && module.projects.length > 0) {
    const projLi = document.createElement('li');

    const header = document.createElement('h3');
    header.innerHTML = "Projects";
    projLi.appendChild(header);

    const projUl = document.createElement('ul');
    for (const project of module.projects) {
      projUl.appendChild(assignment(state, project, student));
    }
    projLi.appendChild(projUl);

    assignmentsUl.appendChild(projLi);
  }

  if (module.exercises && module.exercises.length > 0) {
    const exLi = document.createElement('li');

    const header = document.createElement('h3');
    header.innerHTML = "Exercises";
    exLi.appendChild(header);

    const exUl = document.createElement('ul');
    for (const exercise of module.exercises) {
      exUl.appendChild(assignment(state, exercise, student));
    }
    exLi.appendChild(exUl);

    assignmentsUl.appendChild(exLi);
  }

  if (module.assessments && module.assessments.length > 0) {
    const assLi = document.createElement('li');

    const header = document.createElement('h3');
    header.innerHTML = "Assessments";
    assLi.appendChild(header);

    const assUl = document.createElement('ul');
    for (const assessment of module.assessments) {
      assUl.appendChild(assignment(state, assessment, student));
    }
    assLi.appendChild(assUl);

    assignmentsUl.appendChild(assLi);
  }

  const container = document.createElement('div');
  container.appendChild(assignmentsUl);

  return container;

};
