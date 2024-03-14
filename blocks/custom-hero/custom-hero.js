export default function decorate(block) {
  const hpHero = block.closest('.homepage-hero');
  const tablist = hpHero.querySelector('.tabs-list');
  const defaultContent = hpHero.querySelector('.default-content-wrapper');
  const activeTab = tablist.querySelector('[aria-selected="true"]').textContent;
  const button = defaultContent.querySelector('.button');
  const icon = defaultContent.querySelector('.icon');

  defaultContent.querySelector('.button-container').append(icon);
  tablist.prepend(block);
  button.textContent = activeTab;

  [...tablist.children].forEach((tab) => {
    tab.addEventListener('click', () => {
      button.textContent = tab.textContent;
    });
  });
}
