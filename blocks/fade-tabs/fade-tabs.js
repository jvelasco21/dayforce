// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

// window.onscroll = function() {stickyTablist()};

// Creates a "sticky" tablist on vertical scroll
function stickyTablist() {
  const mobileTabs = document.querySelector('.mobile-offer-tabs');
  if (mobileTabs) {
    const tabsContainer = mobileTabs.querySelector('.tabs-container');
    const sticky = tabsContainer.offsetTop;
    window.onscroll = () => {
      if (window.scrollY > sticky) {
        tabsContainer.classList.add('sticky');
      } else {
        tabsContainer.classList.remove('sticky');
      }
    };
    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.1;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }
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

// Creates active tab underline transition
function createTabIndicator() {
  const mobileTabs = document.querySelector('.mobile-offer-tabs');
  if (mobileTabs) {
    const tabSliderWrapper = mobileTabs.querySelector('.tabs-slider-wrapper');
    const tablist = mobileTabs.querySelector('.tabs-list');
    const indicator = mobileTabs.querySelector('.tabs-indicator');
    tablist.addEventListener('click', (event) => {
      if (event.target.classList.contains('tabs-tab')) {
        const rect = event.target.getBoundingClientRect();
        const tabWidth = rect.width;
        let tabPosition = rect.left - 24;
        tabPosition += tabSliderWrapper.scrollLeft;
        indicator.style.width = `${tabWidth}px`;
        indicator.style.setProperty('--translate-x', `${tabPosition}px`);
      }
    });
  }
}

// Creates a tab slider effect when scrolling/clicking on tab navigation
function createTabSlider() {
  const mobileTabs = document.querySelector('.mobile-offer-tabs');
  if (mobileTabs) {
    const tabSliderWrapper = mobileTabs.querySelector('.tabs-slider-wrapper');
    const tablistWrapper = mobileTabs.querySelector('.tabs-list-wrapper');
    const leftArrow = mobileTabs.querySelector('.arrow-left');
    const rightArrow = mobileTabs.querySelector('.arrow-right');
    tabSliderWrapper.addEventListener('scroll', (e) => {
      leftArrow.classList.toggle('hide', e.target.scrollLeft <= 1);
      rightArrow.classList.toggle('hide', tablistWrapper.scrollWidth - (tabSliderWrapper.clientWidth + e.target.scrollLeft) <= 1);
    });

    leftArrow.addEventListener('click', (e) => {
      e.preventDefault();
      tabSliderWrapper.scrollLeft -= 150;
    });

    rightArrow.addEventListener('click', (e) => {
      e.preventDefault();
      tabSliderWrapper.scrollLeft += 150;
    });
  }
}

// Creates a wrapper to group together tab list and navigation
async function createTablistWrapper(block, tablist) {
  if (block.classList.contains('mobile')) {
    const buttonWrapper = block.closest('.mobile-offer-tabs').querySelector('.default-content-wrapper');
    const tabListWrapper = document.createElement('div');
    const tabIndicator = document.createElement('div');
    const tabSliderWrapper = document.createElement('div');
    const tabContainer = document.createElement('div');
    tabListWrapper.className = 'tabs-list-wrapper';
    tabIndicator.className = 'tabs-indicator';
    tabSliderWrapper.className = 'tabs-slider-wrapper';
    tabContainer.className = 'tabs-container';

    // Remove default <p> tag from navigation buttons
    const pTag = buttonWrapper.children[0];
    const aTags = Array.from(pTag.children);
    aTags[0].className = 'tab-control arrow-left hide';
    aTags[1].className = 'tab-control arrow-right';
    aTags.forEach((item) => {
      tabContainer.appendChild(item);
    });
    pTag.remove();
    buttonWrapper.remove();
    tabListWrapper.appendChild(tablist);
    tabListWrapper.insertBefore(tabIndicator, tabListWrapper.children[0]);
    tabSliderWrapper.appendChild(tabListWrapper);
    tabContainer.appendChild(tabSliderWrapper);
    block.insertBefore(tabContainer, block.children[0]);
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

  createTablistWrapper(block, tablist);
  createClassNames(block);
  createTabSlider();
  createTabIndicator();
  stickyTablist();
}
