/** @module CustomElement */

import { container } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class CustomElement extends window.HTMLElement {
	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.render();
	}

	/** Element removes from DOM. */
	disconnectedCallback() {}

	/**
	 * Render component content.
	 */
	render() {
		/** @type {SearchResult} */
		this.element = document.createElement('div');
		this.appendChild(this.element);
	}
}

/** Define custom element. */
window.customElements.define('custom-element', CustomElement);
export default CustomElement;
