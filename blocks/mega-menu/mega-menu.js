export default function decorate(block) {
  [...block.children].forEach((row) => {
    [...row.children].forEach((col, i) => {
      col.classList.add('column');
      col.classList.add(`column-${i + 1}`);
    });
  });

  if (block.classList.contains('menu-1')) {
    const menuItem1 = block.closest('.header-bottom').querySelector('.main-nav-item-1');
    const menu1 = block.closest('.mega-menu-wrapper');
    menuItem1.append(menu1);
  }
}
