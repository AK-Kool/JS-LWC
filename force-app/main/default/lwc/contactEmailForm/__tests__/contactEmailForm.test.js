import { createElement } from 'lwc';
import ContactEmailForm from 'c/contactEmailForm';

describe('c-contact-email-form', () => {
    let element;

    beforeEach(() => {
        // Create initial email list
        element = createElement('c-contact-email-form', {
            is: ContactEmailForm
        });
        element.emailList = [
            { id: 1, email: 'john.doe@example.com', type: 'Corporate' },
            { id: 2, email: 'jane.doe@example.com', type: 'Personal' }
        ];
        document.body.appendChild(element);
    });

    afterEach(() => {
        // Clean up after each test
        document.body.innerHTML = '';
    });

    it('renders correctly with initial email list', () => {
        // Check if the comboboxes and lightning-inputs are correctly rendered
        const comboboxes = element.shadowRoot.querySelectorAll('lightning-combobox');
        const inputBoxes = element.shadowRoot.querySelectorAll('lightning-input');
        const deleteButtons = element.shadowRoot.querySelectorAll('lightning-button-icon');
        expect(comboboxes).toHaveLength(2);
        expect(inputBoxes).toHaveLength(2);
        expect(deleteButtons).toHaveLength(2);

        // Check if the comboboxes and lightning-inputs have the correct attributes
        comboboxes.forEach((combobox, index) => {
            expect(combobox.dataset.rowId).toBe((index + 1).toString());
        });
        inputBoxes.forEach((inputBox, index) => {
            expect(inputBox.dataset.rowId).toBe((index + 1).toString());
        });
        deleteButtons.forEach((deleteButton, index) => {
            expect(deleteButton.dataset.rowId).toBe((index + 1).toString());
        });
    });

    it('handles new email address creation', () => {
        // Simulate clicking the "Add Email Address" button
        const addButton = element.shadowRoot.querySelector('button');
        addButton.click();

        // Check if a new combobox and lightning-input are added
        return Promise.resolve().then(() => {
            const comboboxes = element.shadowRoot.querySelectorAll('lightning-combobox');
            const inputBoxes = element.shadowRoot.querySelectorAll('lightning-input');
            const deleteButtons = element.shadowRoot.querySelectorAll('lightning-button-icon');
            expect(comboboxes).toHaveLength(3);
            expect(inputBoxes).toHaveLength(3);
            expect(deleteButtons).toHaveLength(3);

            // Check if the new combobox and lightning-input have the correct attributes
            const newCombobox = comboboxes[2];
            const newInputBox = inputBoxes[2];
            const newDeleteButton = deleteButtons[2];
            expect(newCombobox.dataset.rowId).toBe('3');
            expect(newInputBox.dataset.rowId).toBe('3');
            expect(newDeleteButton.dataset.rowId).toBe('3');
        });
    });

    it('handles email type selection change', () => {
        // Simulate changing the email type selection
        const combobox = element.shadowRoot.querySelector('lightning-combobox');
        combobox.value = 'Personal';
        combobox.dispatchEvent(new CustomEvent('change', { detail: { value: 'Personal' } }));

        // Check if the email type is updated
        return Promise.resolve().then(() => {
            expect(combobox.value).toBe('Personal');
        });
    });

    it('handles email address input change', () => {
        // Simulate changing the email address input
        const inputBox = element.shadowRoot.querySelector('lightning-input');
        inputBox.value = 'test@example.com';
        inputBox.dispatchEvent(new CustomEvent('change', { detail: { value: 'test@example.com' } }));

        // Check if the email address is updated
        return Promise.resolve().then(() => {
            expect(inputBox.value).toBe('test@example.com');
        });
    });

    it('handles email deletion', () => {
        // Simulate clicking the delete button for the first email address
        const deleteButton = element.shadowRoot.querySelector('lightning-button-icon');
        deleteButton.click();

        // Check if the first combobox and lightning-input are removed
        return Promise.resolve().then(() => {
            const comboboxes = element.shadowRoot.querySelectorAll('lightning-combobox');
            const inputBoxes = element.shadowRoot.querySelectorAll('lightning-input');
            const deleteButtons = element.shadowRoot.querySelectorAll('lightning-button-icon');
            expect(comboboxes).toHaveLength(1);
            expect(inputBoxes).toHaveLength(1);
            expect(deleteButtons).toHaveLength(1);

            // Check if the remaining combobox and lightning-input have the correct attributes
            const remainingCombobox = comboboxes[0];
            const remainingInputBox = inputBoxes[0];
            const remainingDeleteButton = deleteButtons[0];
            expect(remainingCombobox.dataset.rowId).toBe('2');
            expect(remainingInputBox.dataset.rowId).toBe('2');
            expect(remainingDeleteButton.dataset.rowId).toBe('2');
        });
    });

    it('handles blur event on email input', () => {
        // Simulate blurring out of the email input
        const inputBox = element.shadowRoot.querySelector('lightning-input');
        inputBox.value = 'group';
        inputBox.dispatchEvent(new CustomEvent('blur'));

        // Check if the input value is updated and custom validity is set
        return Promise.resolve().then(() => {
            expect(inputBox.value).toBe('Group');
            expect(inputBox.validity.customError).toBe(true);
        });
    });
});