/** @module ToastMessage */

import { animations } from '../../constants';
import { container, text } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ToastMessage extends window.HTMLElement {
	/** Observed attributes */
	static get observedAttributes() {
		return ['message'];
	}

	/** @type {String} */
	set message(value) {
		this.setAttribute('message', value);
	}

	get message() {
		return this.getAttribute('message');
	}

	constructor() {
		super();

		/** @type {HTMLParagraphElement} */
		this.messageNode = document.createElement('p');
		this.messageNode.classList.add(text);

		this.addEventListener('click', () => {
			this.handleClose();
		});
	}

	/** Element attributes has change. */
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'message' && oldValue !== newValue) {
			this.messageNode.innerText = newValue;
		}
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.render();
		this.animate(animations.slideIn, { duration: 250 });

		this.timeout = setTimeout(() => {
			this.handleClose();
		}, 3000);
	}

	handleClose() {
		clearTimeout(this.timeout);
		const animation = this.animate(animations.slideOut, { duration: 250 });
		animation.onfinish = () => {
			this.parentNode.removeChild(this);
		};
	}

	/**
	 * Render component content.
	 */
	render() {
		this.appendChild(this.messageNode);
	}
}

/** Define custom element. */
window.customElements.define('toast-message', ToastMessage);
export default ToastMessage;
