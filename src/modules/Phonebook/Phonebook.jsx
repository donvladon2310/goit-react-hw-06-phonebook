import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import styles from './phonebook.modules.css';
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import ContactForm from "./ContactForm/ContactForm";
import { useSelector, useDispatch } from "react-redux";
import { addContact, deleteContact } from "redux/actions";

const Phonebook = () => {

    const contacts = useSelector(store => store.contacts)
    const [filter, setFilter] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem("my-contacts", JSON.stringify(contacts))
    }, [contacts])

    const isDublicate = (name) => {
        const normName = name.toLowerCase();
        const duble = contacts.find(({ name }) => {
            return (name.toLowerCase() === normName)
        })
        return Boolean(duble)
    }

    const onAddContact = ({ name, number }) => {
        if (isDublicate(name)) {
            return alert(`${name} is alredy in contacts`);
        }
        const action = addContact({ name, number })
        dispatch(action);
    }

    const onRemoveContact = (id) => {
        const action = deleteContact(id);
        dispatch(action);
    }

    const handelFilter = ({ target }) => setFilter(target.value);

    const getFilteredContacts = () => {
        if (!filter) {
            return contacts
        }
        const normFilter = filter.toLowerCase()
        const result = contacts.filter(({ name, number }) => {
            return (name.toLowerCase().includes(normFilter) || number.toLowerCase().includes(normFilter))
        })
        return result;
    }

    const filteredContacts = getFilteredContacts();

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
                    <Filter handelChange={handelFilter} />
                    <ContactList removeContact={onRemoveContact} contacts={filteredContacts} />
                </div>
            </div>
        </div>
    )

}

export default Phonebook;



