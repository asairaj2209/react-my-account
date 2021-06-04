import React from 'react';
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom';
import App from './App';

class ReactElement extends HTMLElement {
  // eslint-disable-next-line
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['selectedvalue', 'toggle'];
  }
  connectedCallback() {
    this._innerHTML = this.innerHTML;
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
  }

  update() {
    this.unmount();
    this.mount();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    // eslint-disable-next-line
    switch (name) {
      case 'selectedvalue':
        console.log(`Value changed from ${oldValue} to ${newValue}`);
        this.mount()
        break;
      case 'toggle':
        console.log(`Value changed from ${oldValue} to ${newValue}`);
        this.mount()
        break;
    }
  }
  mount() {
    const props = {
      selectedvalue: this.getAttribute("selectedvalue"),
      toggleval: this.getAttribute("toggle")
    }
    render(<App  {...props} />, this);

  }

  unmount() {
    unmountComponentAtNode(this);
  }

}

customElements.define('my-account', ReactElement);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);