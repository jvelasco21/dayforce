// Animates the dropdown items for footer-middle-top-columns in mobile view
function animateDropdown(col) {
  const minus = col.querySelectorAll('.icon-plus');
  minus.forEach((item) => item.parentNode.classList.add('active'));
  const titles = col.querySelectorAll('.title');
  titles.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.currentTarget === item) {
        e.preventDefault();
        item.classList.toggle('active');
        const icons = item.querySelectorAll('.icon');
        icons.forEach((icon) => icon.parentNode.classList.toggle('active'));
        const content = item.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      }
    });
  });
}

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col, i) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      // header utlity
      if (col.closest('.utility-links') !== null) {
        col.classList.add('utility-column');
        col.classList.add(`utility-column-${i + 1}`);
      }

      // header main nav column
      if (col.closest('.main-nav') !== null) {
        col.classList.add('main-nav-column');
        col.classList.add(`main-nav-column-${i + 1}`);
      }

      // header mian nav
      if (col.closest('.main-nav') !== null && col.closest('.main-nav-column-2')) {
        const ul = col.firstElementChild;
        ul.classList.add('nav-ul');
        ul.querySelectorAll('li').forEach((item, index) => {
          item.classList.add(`main-nav-item-${index + 1}`);
          item.addEventListener('click', (e) => {
            if (ul.querySelector('.active') && !item.classList.contains('active')) {
              ul.querySelector('.active').classList.remove('active');
            }
            item.classList.toggle('active');
            e.preventDefault();
          });
        });
      }

      // footer columns
      if (col.closest('.footer-top-columns') !== null) {
        col.parentNode.classList.add('footer-column-wrapper');
        col.classList.add('footer-column');
        col.classList.add(`footer-column-${i + 1}`);
      }
      if (col.closest('.footer-middle-top-columns') !== null) {
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        col.parentNode.classList.add('footer-column-wrapper');
        col.classList.add('footer-column');
        col.classList.add(`footer-column-${i + 1}`);
        const colArr = Array.from(col.children);
        const titleEl = colArr.filter((item) => item.tagName !== 'UL');
        titleEl.forEach((item) => titleDiv.appendChild(item));
        col.insertBefore(titleDiv, col.children[0]);
        animateDropdown(col);
      }
      if (col.closest('.footer-middle-bottom-columns') !== null) {
        col.parentNode.classList.add('footer-column-wrapper');
        col.classList.add('footer-column');
        col.classList.add(`footer-column-${i + 1}`);
      }
      if (col.closest('.footer-bottom-columns') !== null) {
        col.parentNode.classList.add('footer-column-wrapper');
        col.classList.add('footer-column');
        col.classList.add(`footer-column-${i + 1}`);
      }
    });
  });
}
