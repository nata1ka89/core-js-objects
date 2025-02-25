class CssSelector {
  constructor(selector = '') {
    this.selector = selector;
    this.justOnceElement = false;
    this.justOncePseudoElement = false;
    this.justOnceId = false;
    this.order = 0;
  }

  element(value) {
    if (this.justOnceElement) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    if (this.order > 0) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.selector += value;
    this.justOnceElement = true;
    this.order = 1;
    return this;
  }

  id(value) {
    if (this.justOnceId) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    if (this.order > 1) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }

    this.selector += `#${value}`;
    this.justOnceId = true;
    this.order = 2;
    return this;
  }

  class(value) {
    if (this.order > 2) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.selector += `.${value}`;
    this.orderClass = true;
    this.order = Math.max(this.order, 2);
    return this;
  }

  attr(value) {
    if (this.order > 3) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.selector += `[${value}]`;
    this.order = Math.max(this.order, 3);
    return this;
  }

  pseudoClass(value) {
    if (this.order > 4) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }
    this.selector += `:${value}`;
    this.order = Math.max(this.order, 4);
    return this;
  }

  pseudoElement(value) {
    if (this.justOncePseudoElement) {
      throw new Error(
        'Element, id and pseudo-element should not occur more then one time inside the selector'
      );
    }
    if (this.order > 5) {
      throw new Error(
        'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
      );
    }

    this.selector += `::${value}`;
    this.justOncePseudoElement = true;
    this.order = 6;
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.selector += `${selector1.selector} ${combinator} ${selector2.selector}`;
    return this;
  }

  stringify() {
    return this.selector;
  }
}

module.exports = CssSelector;
