// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

// Create <p> class names to distinguish styling
function createClassNames(block) {
  if (block.classList.contains('mobile')) {
    const panels = block.querySelectorAll('.tabs-panel');
    panels.forEach((panel) => {
      for (let i = 0; i < panel.children[0].children.length; i += 1) {
        panel.children[0].children[i].classList.add(`row-${i}`);
      }
    });
  }
}

function createMobileTabNavigation() {
  const tabsContainer = document.querySelector('.mobile-offer-tabs');
  if (tabsContainer) {
    const tablist = tabsContainer.querySelector('.tabs-list');
    const leftTab = tabsContainer.querySelector('.arrow-left');
    const rightTab = tabsContainer.querySelector('.arrow-right');
    const { clientWidth, scrollWidth } = tablist;
    tablist.addEventListener('scroll', (e) => {
      const maxScrollWidth = scrollWidth - (clientWidth + e.target.scrollLeft);
      leftTab.classList.remove('hide');
      leftTab.classList.toggle('hide', e.target.scrollLeft <= 0);
      rightTab.classList.toggle('hide', scrollWidth - (clientWidth + e.target.scrollLeft) <= maxScrollWidth + 1);
    });

    leftTab.addEventListener('click', (e) => {
      e.preventDefault();
      tablist.scrollLeft -= 150;
    });

    rightTab.addEventListener('click', (e) => {
      e.preventDefault();
      tablist.scrollLeft += 150;
    });
  }
}

// Creates a wrapper to group together tab list and navigation
async function createMobileWrapper(block, tablist) {
  if (block.classList.contains('mobile')) {
    const buttonWrapper = block.closest('.mobile-offer-tabs').querySelector('.default-content-wrapper');
    const tabListWrapper = document.createElement('div');
    const tabIndicator = document.createElement('div');
    const tabSliderWrapper = document.createElement('div');
    tabListWrapper.className = 'tabs-list-wrapper';
    tabIndicator.className = 'tabs-indicator';
    tabSliderWrapper.className = 'tabs-slider-wrapper';

    // Remove default <p> tag from navigation buttons
    const pTag = buttonWrapper.children[0];
    const aTags = Array.from(pTag.children);
    aTags[0].className = 'tab-control arrow-left hide';
    aTags[1].className = 'tab-control arrow-right';
    aTags.forEach((item) => {
      tabSliderWrapper.appendChild(item);
    });
    pTag.remove();
    buttonWrapper.remove();
    tabListWrapper.appendChild(tablist);
    tabListWrapper.insertBefore(tabIndicator, tabListWrapper.children[0]);
    tabSliderWrapper.appendChild(tabListWrapper);
    block.insertBefore(tabSliderWrapper, block.children[0]);
  }
}

// Builds tabList
export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');
    if (!hasWrapper(tabpanel.lastElementChild)) {
      tabpanel.lastElementChild.innerHTML = `<p>${tabpanel.lastElementChild.innerHTML}</p>`;
    }

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      const buttonControl = button.attributes[2].nodeValue;
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        if (panel.id === buttonControl && panel.attributes[3].nodeValue === 'false') {
          return;
        }
        panel.classList.add('opacity-0');
        setTimeout(() => {
          panel.classList.remove('opacity-0');
          panel.setAttribute('aria-hidden', true);
          panel.setAttribute('hidden', true);
        }, 300);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      setTimeout(() => {
        tabpanel.setAttribute('aria-hidden', false);
        tabpanel.setAttribute('hidden', false);
      }, 300);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);

  createMobileWrapper(block, tablist);
  createClassNames(block);
  createMobileTabNavigation();
}
