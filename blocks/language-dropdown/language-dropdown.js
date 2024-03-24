export default function decorate(block) {
  let buttonColumn = '';
  let iconString = '';

  if (block.closest('.header-top')) {
    buttonColumn = block.closest('.header-top').querySelector('.utility-column-5');
    iconString = '.icon-nav-arrow';
  }

  if (block.closest('.footer-bottom')) {
    buttonColumn = block.closest('.footer-bottom').querySelector('.button-container');
    iconString = '.icon-nav-arrow-light';
  }

  const languageWrapper = block.closest('.language-dropdown-wrapper');
  const langaugeButtonColumn = buttonColumn;
  const languageButton = langaugeButtonColumn.querySelector('.button');
  const buttonGlobe = languageButton.querySelector('.icon-globesmall');
  const buttonArrow = languageButton.querySelector(iconString);
  const languageItems = block.querySelectorAll('.language-dropdown li');
  block.querySelector('.language-dropdown li').classList.add('active');
  langaugeButtonColumn.append(languageWrapper);

  function animateDropdown() {
    languageWrapper.classList.toggle('active');
    languageButton.classList.toggle('active');
  }

  languageButton.addEventListener('click', (e) => {
    animateDropdown();
    e.preventDefault();
  });

  languageItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      block.querySelector('.language-dropdown li.active').classList.remove('active');
      item.classList.add('active');
      languageButton.textContent = item.textContent;
      languageButton.prepend(buttonGlobe);
      languageButton.append(buttonArrow);
      animateDropdown();
      e.preventDefault();
    });
  });
}
