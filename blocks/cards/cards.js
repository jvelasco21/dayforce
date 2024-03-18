import { createOptimizedPicture } from '../../scripts/aem.js';

// Creates and wraps an anchor tag around each tab button
function createAnchorEl() {
  const cardsContainer = document.querySelector('.anchor-card');
  if (cardsContainer) {
    const cards = cardsContainer.getElementsByTagName('li');
    if (cards) {
      for (let i = 0; i < cards.length; i += 1) {
        const element = cards[i];
        // Grabs last p tag in card, then anchor tag
        const link = element.lastElementChild.lastElementChild.lastElementChild;
        const parent = element.parentNode;
        const wrapper = document.createElement('a');
        wrapper.setAttribute('href', link);
        wrapper.setAttribute('target', '_blank');
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
      }
    }
  }
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => {
    if (!img.src.endsWith('.svg')) {
      img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
    }
  });
  block.textContent = '';
  block.append(ul);
  createAnchorEl();
}
