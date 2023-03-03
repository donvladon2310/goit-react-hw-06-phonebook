import { useEffect } from "react";
import styles from './phonebook.modules.css';
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";
import { useSelector, useDispatch } from "react-redux";
import { addContact, deleteContact } from "redux/contacts/contacts-slice";
import { setFilter } from "redux/filter/filter-slice";
import { getAllContacts, getFilteredContacts } from "redux/contacts/contacts-selectors";
import { getFilter } from "redux/filter/filter-selectors";

const Phonebook = () => {

    const filteredContacts = useSelector(getFilteredContacts);
    const allContacts = useSelector(getAllContacts)
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("my-contacts", JSON.stringify(allContacts))
    }, [allContacts])

    const isDublicate = (name) => {
        const normName = name.toLowerCase();
        const duble = allContacts.find(({ name }) => {
            return (name.toLowerCase() === normName)
        })
        return Boolean(duble)
    }

    const onAddContact = ({ name, number }) => {
        if (isDublicate(name)) {
            return alert(`${name} is alredy in contacts`);
        }
        dispatch(addContact({ name, number }));
    }

    const onRemoveContact = (id) => {
        dispatch(deleteContact(id));
    }

    const handelFilter = ({ target }) => {
        dispatch(setFilter(target.value))
    };

    return (
        <div>
            <h3>Phonebook</h3>
            <div>
                <div className={styles.wrapper}>
                    <h4>Name</h4>
                    <ContactForm onSubmit={onAddContact} />
                </div>
                <div>
                    <h4>Contacts</h4>
                    <Filter value={filter} handelChange={handelFilter} />
                    <ContactList removeContact={onRemoveContact} contacts={filteredContacts} />
                </div>
            </div>
        </div>
    )

}

export default Phonebook;



