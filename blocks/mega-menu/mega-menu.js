export default function decorate(block) {
  [...block.children].forEach((row) => {
    [...row.children].forEach((col, i) => {
      const subList = col.querySelectorAll('li');
      const megaCard = col.querySelectorAll('td');
      col.classList.add('column');
      col.classList.add(`column-${i + 1}`);

      [...subList].forEach((subItem) => {
        const subLink = subItem.querySelector('a');

        if (subLink && subItem.querySelector('strong')) {
          const newSubLink = document.createElement('a');
          newSubLink.title = subLink.title;
          newSubLink.href = subLink.getAttribute('href');
          newSubLink.innerHTML = subItem.innerHTML;
          newSubLink.querySelector('strong').append(subLink.textContent);
          newSubLink.querySelector('br').remove();
          newSubLink.querySelector('a').remove();
          subItem.innerHTML = '';
          subItem.append(newSubLink);
        }
      });

      [...megaCard].forEach((card) => {
        if (card.closest('.column-3')) {
          const cardLink = card.querySelector('a');

          if (cardLink) {
            const newCardLink = document.createElement('a');
            newCardLink.title = cardLink.title;
            newCardLink.href = cardLink.getAttribute('href');
            newCardLink.innerHTML = card.innerHTML;
            newCardLink.querySelector('.button-container').innerHTML = cardLink.innerHTML;
            card.innerHTML = '';
            card.append(newCardLink);
          }
        }
      });
    });
  });

  if (block.classList.contains('menu-1')) {
    const menuItem1 = block.closest('.header-bottom').querySelector('.main-nav-item-1');
    const menu1 = block.closest('.mega-menu-wrapper');
    menuItem1.append(menu1);
  }

  if (block.classList.contains('menu-2')) {
    const menuItem2 = block.closest('.header-bottom').querySelector('.main-nav-item-2');
    const menu2 = block.closest('.mega-menu-wrapper');
    menuItem2.append(menu2);
  }

  if (block.classList.contains('menu-3')) {
    const menuItem3 = block.closest('.header-bottom').querySelector('.main-nav-item-3');
    const menu3 = block.closest('.mega-menu-wrapper');
    menuItem3.append(menu3);
  }

  if (block.classList.contains('menu-4')) {
    const menuItem4 = block.closest('.header-bottom').querySelector('.main-nav-item-4');
    const menu4 = block.closest('.mega-menu-wrapper');
    menuItem4.append(menu4);
  }

  if (block.classList.contains('menu-5')) {
    const menuItem5 = block.closest('.header-bottom').querySelector('.main-nav-item-5');
    const menu5 = block.closest('.mega-menu-wrapper');
    menuItem5.append(menu5);
  }
}
