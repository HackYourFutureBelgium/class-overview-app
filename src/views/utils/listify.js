export default (arr, listType = 'ul') => arr
  .filter(item => item instanceof Element)
  .map(item => {
    const li = document.createElement('li');
    li.appendChild(item);
    return li;
  })
  .reduce((ul, li) => {
    ul.appendChild(li);
    return ul;
  }, document.createElement(listType));
