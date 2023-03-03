export const getAllContacts = store => store.contacts;
export const getFilteredContacts = ({ contacts, filter }) => {
    if (!filter) {
        return contacts
    }
    const normFilter = filter.toLowerCase()
    const result = contacts.filter(({ name, number }) => {
        return (name.toLowerCase().includes(normFilter) || number.toLowerCase().includes(normFilter))
    })
    return result;
}