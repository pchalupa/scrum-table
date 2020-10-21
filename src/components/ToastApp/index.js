/** @module ToastApp */

import '../ToastMessage';
import { container } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ToastApp extends window.HTMLElement {
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

	/** Element attributes has change. */
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'message') {
			this.handleAddToast(newValue, 3000);
		}
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
	}

	/**
	 * Append toast-message element
	 * @param {String} message
	 */
	handleAddToast(message, timeout) {
		const toast = document.createElement('toast-message');
		toast.message = message;
		toast.timeout = timeout;
		this.insertBefore(toast, this.firstChild);
	}
}

/** Define custom element. */
window.customElements.define('toast-app', ToastApp);
export default ToastApp;
