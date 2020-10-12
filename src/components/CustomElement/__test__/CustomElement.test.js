import '../index';

describe('custom-element', () => {
	const ELEMENT_TAG = 'custom-element';
	let element;

	beforeEach(() => {
		element = document.createElement(ELEMENT_TAG);
		document.body.appendChild(element);
	});

	afterEach(() => {
		document.body.removeChild(element);
	});

	it('should be registered', () => {
		expect.assertions(1);

		expect(customElements.get(ELEMENT_TAG)).toBeDefined();
	});

	it('renders correctly', () => {
		expect.assertions(2);

		expect(element.classList.contains('container')).toBeTruthy();
		expect(element).toMatchSnapshot();
	});
});
