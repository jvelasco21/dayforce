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

      // header utlity
      if (col.closest('.main-nav') !== null) {
        col.classList.add('main-nav-column');
        col.classList.add(`main-nav-column-${i + 1}`);
      }

      // header mian nav
      if (col.closest('.main-nav') !== null && col.closest('.main-nav-column-2')) {
        const ul = col.firstElementChild;
        ul.classList.add('nav-ul');
        ul.querySelectorAll('li').forEach((item) => {
          item.classList.add(`main-nav-item-${i + 1}`);
        });
      }
    });
  });
}
