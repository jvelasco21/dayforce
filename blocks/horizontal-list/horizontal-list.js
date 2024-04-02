function animateDropdown(clone, button) {
  clone.classList.toggle('active');
  button.classList.toggle('active');
}

function createListSlider(listWrapper, aTags) {
  if (listWrapper) {
    requestAnimationFrame(() => {
      const contentWrapper = listWrapper.querySelector('.content-wrapper');
      const list = contentWrapper.querySelector('ul');
      const leftArrow = aTags[0];
      const rightArrow = aTags[1];
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const { inlineSize: width } = entry.contentBoxSize[0];
          if (width < window.screen.width) {
            aTags[1].classList.add('hide');
          } else {
            aTags[1].classList.remove('hide');
          }
        });
      });
      observer.observe(listWrapper);

      contentWrapper.addEventListener('scroll', (e) => {
        leftArrow.classList.toggle('hide', e.target.scrollLeft <= 1);
        rightArrow.classList.toggle('hide', list.scrollWidth - (contentWrapper.clientWidth + e.target.scrollLeft) <= 1);
      });
      leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        contentWrapper.scrollLeft -= 150;
      });
      rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        contentWrapper.scrollLeft += 150;
      });
    });
  }
}

// Creates buttons to navigate list
function createNavButtons(block) {
  const buttonWrapper = block.closest('.horizontal-list-container').querySelector('.default-content-wrapper');
  const listWrapper = block.closest('.horizontal-list-wrapper');
  const pTag = buttonWrapper.querySelector('p');
  const aTags = Array.from(pTag.children);
  aTags[0].className = 'list-control arrow-left hide';
  aTags[1].className = 'list-control arrow-right';
  aTags.forEach((item) => {
    listWrapper.insertBefore(item, listWrapper.children[0]);
  });
  pTag.remove();
  // showHideNavButtons();
  createListSlider(listWrapper, aTags);
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
  createNavButtons(block);
}
