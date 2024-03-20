export default function decorate(block) {
  const div = document.createElement('div');
  div.className = 'content-wrapper';
  const ul = document.createElement('ul');
  const wrapper = block.children[0].children[0];
  const pTags = block.querySelectorAll('p');
  const aTags = block.querySelectorAll('a');
  aTags.forEach((tag) => {
    const li = document.createElement('li');
    li.className = 'button-container';
    li.appendChild(tag);
    ul.appendChild(li);
  });
  div.appendChild(ul);
  wrapper.appendChild(div);
  for (let i = pTags.length - 1; i >= 0; i -= 1) {
    pTags[i].remove();
  }
}
