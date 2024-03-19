export default function decorate(block) {
  const languageWrapper = block.closest('.language-dropdown-wrapper');
  const langaugeButtonColumn = block.closest('.header-top').querySelector('.utility-column-5');
  const languageButton = langaugeButtonColumn.querySelector('.button');
  const buttonGlobe = languageButton.querySelector('.icon-globesmall');
  const buttonArrow = languageButton.querySelector('.icon-nav-arrow');
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
