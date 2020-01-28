import React from "react";
import ReactDOM from "react-dom";
import htmlToReact from "html-to-react";

export default (Component, tag) => {
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      this.observer = new MutationObserver(() => this.update());
      this.observer.observe(this, { attributes: true });
    }
    connectedCallback() {
      this._innerHTML = this.innerHTML;
      this.mount();
    }
    disconnectedCallback() {
      this.unmount();
      this.observer.disconnect();
    }
    update() {
      this.unmount();
      this.mount();
    }
    mount() {
      const props = {
        ...this.getProps(this.attributes, Component.propTypes),
        ...this.getEvents(Component.propTypes),
        children: this.parseHtmlToReact(this.innerHTML)
      };
      ReactDOM.render(<Component {...props} />, this);
    }
    parseHtmlToReact(html) {
      return html && new htmlToReact.Parser().parse(html);
    }
    getEvents(propTypes) {
      return Object.keys(propTypes)
        .filter(key => /on([A-Z].*)/.exec(key))
        .reduce(
          (events, ev) => ({
            ...events,
            [ev]: args => {
              return this.dispatchEvent(new CustomEvent(ev, { detail: args }));
            }
          }),
          {}
        );
    }
    unmount() {
      ReactDOM.unmountComponentAtNode(this);
    }
    getProps(attributes, propTypes) {
      propTypes = propTypes || {};
      return [...attributes]
        .filter(attr => attr.name !== "style")
        .map(attr => this.convert(propTypes, attr.name, attr.value))
        .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {});
    }
    convert(propTypes, attrName, attrValue) {
      const propName = Object.keys(propTypes).find(
        key => key.toLowerCase() === attrName
      );
      let value = attrValue;
      if (attrValue === "true" || attrValue === "false")
        value = attrValue === "true";
      else if (!isNaN(attrValue) && attrValue !== "") value = +attrValue;
      else if (/^[{[].*[}\]]/.exec(attrValue)) value = JSON.parse(attrValue);
      return {
        name: propName ? propName : attrName,
        value: value
      };
    }
  }

  customElements.define(tag, CustomElement);
};