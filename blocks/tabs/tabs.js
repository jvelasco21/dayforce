// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

// Creates and wraps an anchor tag around each tab button
function createAnchorEl() {
  const tabs = document.querySelector('.anchor-tab');
  const tabList = tabs.querySelector('.tabs-list');
  if (tabList) {
    const buttons = tabList.getElementsByClassName('tabs-tab');
    if (buttons) {
      for (let i = 0; i < buttons.length; i += 1) {
        const element = buttons[i];
        // Grabs last p tag in tab, then anchor tag
        const link = element.lastElementChild.lastElementChild;
        const parent = element.parentNode;
        const wrapper = document.createElement('a');
        wrapper.setAttribute('href', link);
        wrapper.setAttribute('target', '_blank');
        parent.replaceChild(wrapper, element);
        wrapper.appendChild(element);
      }
    }
  }
}

// Shows tab details for mouseenter
function addHoverEvent(tabId, tabsPanel) {
  if (tabsPanel) {
    const newTabId = tabId.substring(3);
    for (let i = 0; i < tabsPanel.length; i += 1) {
      tabsPanel[i].ariaHidden = true;
      if (tabsPanel[i].id.endsWith(newTabId)) {
        tabsPanel[i].ariaHidden = false;
      }
    }
  }
}

// Hides all tab details on mouseleave, unhides 1st tab details.
function removeHoverEvent(tabId, tabsPanel) {
  if (tabsPanel) {
    const newTabId = tabId.substring(3);
    for (let i = 0; i < tabsPanel.length; i += 1) {
      if (tabsPanel[i].id.endsWith(newTabId)) {
        tabsPanel[i].ariaHidden = true;
        tabsPanel[0].ariaHidden = false;
      }
    }
  }
}

// Event listener for tab mouseenter/mouseleave
function getHoverTabListId() {
  const tabs = document.querySelector('.hover-tab');
  const tabsList = tabs.querySelector('.tabs-list');
  const tabsPanel = tabs.getElementsByClassName('tabs-panel');
  if (tabsList) {
    const buttons = tabsList.getElementsByClassName('tabs-tab');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('mouseenter', (event) => {
        if (buttons[i].id === event.target.id) {
          addHoverEvent(buttons[i].id, tabsPanel);
        }
      });
      buttons[i].addEventListener('mouseleave', (event) => {
        if (buttons[i].id === event.target.id) {
          removeHoverEvent(buttons[i].id, tabsPanel);
        }
      });
    }
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
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);

  createAnchorEl();
  getHoverTabListId();
}
