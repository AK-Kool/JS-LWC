import { LightningElement, track } from 'lwc';

export default class ContactEmailForm extends LightningElement {
    @track emailList = [];
    @track options = [
        { label: 'Corporate', value: 'Corporate' },
        { label: 'Bloomberg', value: 'Bloomberg' },
        { label: 'Personal', value: 'Personal' },
        { label: 'Group', value: 'Group' },
        { label: 'Other', value: 'Other' }
    ];
    @track groupWhiteList = [
        'group',
        'loans',
        'team'
    ];
    @track groupFuzzyWhiteList = [
        'research',
        'coo',
        'gg'
    ];

    handleComboboxChange(event) {
        //let element = this.template.querySelector(`lightning-combobox[data-row-id="${event.target.dataset.rowId}"]`);
        //element.value = event.detail.value;
        let changedEmail = this.emailList.find(row => row.id === parseInt(event.target.dataset.rowId, 10));
        changedEmail.type = event?.detail?.value?.trim();
    }

    handleInputChange(event) {
        let changedEmail = this.emailList.find(row => row.id === parseInt(event.target.dataset.rowId, 10));
        changedEmail.email = event?.detail?.value?.trim();
    }

    handleDeleteClick(event) {
        this.emailList = this.emailList.filter(row => row.id !== parseInt(event.target.dataset.rowId, 10));
    }

    handleNewEmailAddress() {
        this.emailList.push({
            id: this.emailList.length + 1,
        });
    }

    handleBlur(event) {
        let comboboxElement = this.template.querySelector(`lightning-combobox[data-row-id="${event.target.dataset.rowId}"]`);
        let emailLocalPart = event.target.value.split('@')[0];
        if(this.groupWhiteList.includes(emailLocalPart) || this.groupFuzzyWhiteList.some(group => emailLocalPart.includes(group))) {
            comboboxElement.value = 'Group';
        } else {
            if(emailLocalPart.trim() !== '') {
                comboboxElement.setCustomValidity('Please select appropriate type');
                comboboxElement.reportValidity();
                comboboxElement.value = '';
            }
        }
    }
}