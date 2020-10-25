/** @module DropdownApp */

import { container, button, list, expanded } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class DropdownApp extends window.HTMLElement {
	constructor() {
		super();
		/** @type {HTMLUListElement} */
		this.list = document.createElement('ul');
		this.list.classList.add(list);

		/** @type {HTMLButtonElement} */
		this.button = document.createElement('button');
		this.button.classList.add(button);
		this.button.innerText = '\uFE19';

		this.button.addEventListener('click', (e) => {
			e.preventDefault();
			this.list.classList.toggle(expanded);
		});
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.render();
	}

	/**
	 * Render component content.
	 */
	render() {
		const fragment = document.createDocumentFragment();

		//this.list.innerHTML = '<li>Hotovo</li><li>Odloženo</li><li>c</li>';

		fragment.appendChild(this.button);
		fragment.appendChild(this.list);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('dropdown-app', DropdownApp);
export default DropdownApp;
