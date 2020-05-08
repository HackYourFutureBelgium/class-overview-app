export default (text, url) => {
  const button = document.createElement('button');
  button.innerHTML = text;
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.appendChild(button);
  return link;
}
