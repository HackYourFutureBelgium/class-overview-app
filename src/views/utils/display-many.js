export default (arrOfEls, title) => {

  const arrContainer = arrOfEls
    .filter(item => item instanceof Element)
    .reduce((div, item) => {
      div.appendChild(item);
      return div;
    }, document.createElement('div'))

  // arrContainer.style = 'display:flex;flex-direction:row;flex-wrap:wrap;';
  arrContainer.className = 'display-many-items';
  if (typeof title === 'string') arrContainer.id = title;

  const container = document.createElement('details');
  container.id = title;

  if (!title) {
  } else if (typeof title === 'string') {
    const header = document.createElement('h1');
    header.style = 'display: inline;';
    header.innerHTML = title;
    const summary = document.createElement('summary');
    summary.appendChild(header)
    container.appendChild(summary);
  } else if (title instanceof Element) {
    const summary = document.createElement('summary');
    title.style.display = 'inline';
    summary.appendChild(title)
    container.appendChild(summary);
  }

  container.appendChild(arrContainer);
  container.className = 'display-many';

  return container;

}
