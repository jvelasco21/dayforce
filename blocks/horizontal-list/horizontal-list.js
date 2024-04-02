function animateDropdown(clone, button) {
  clone.classList.toggle('active');
  button.classList.toggle('active');
}

// Clone and create mobile dropdown
function mobileDropdown(div) {
  const parentEl = div.closest('.horizontal-list-container');
  const mobileParentEl = parentEl.lastChild;
  mobileParentEl.classList.add('mobile-content-wrapper');
  const buttonColumn = mobileParentEl.querySelector('.button-container');
  const button = buttonColumn.querySelector('.button');
  const clone = div.cloneNode(true);
  clone.className = 'mobile-dropdown-wrapper';
  mobileParentEl.append(clone);

  button.addEventListener('click', (e) => {
    e.preventDefault();
    animateDropdown(clone, button);
  });
}

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

  mobileDropdown(div);
}
