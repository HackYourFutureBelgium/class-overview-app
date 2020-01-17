import assignmentsLazy from './assignments-lazy.js'

export default async (module, student) => {

  if (student.views[module.name]) return student.views[module.name];

  const container = document.createElement('details');

  const summary = document.createElement('summary');
  summary.innerHTML = 'Click to expand ' + student.name + "'s assignments";
  container.appendChild(summary);

  let loaded = false;
  container.onclick = async () => {
    if (!loaded) {
      container.appendChild(await assignmentsLazy(module, student));
      loaded = true;
    }
  }

  student.views[module.name] = container;

  return container;

}
