export default async (state, arr, render, title) => {

  const arrPromises = arr
    .map(item => render(state, item))

  const itemViews = await Promise.all(arrPromises);

  const arrContainer = itemViews
    .reduce((div, item) => {
      div.appendChild(item);
      return div;
    }, document.createElement('div'))

  // arrContainer.style = 'display:flex;flex-direction:row;flex-wrap:wrap;';
  arrContainer.className = 'display-many-items';
  if (typeof title === 'string') arrContainer.id = title;

  const container = document.createElement('div');
  container.id = title;

  if (typeof title === 'string') {
    const header = document.createElement('h1');
    header.innerHTML = title;
    container.appendChild(header);
  }

  container.appendChild(arrContainer);
  container.className = 'display-many';

  return container;

}