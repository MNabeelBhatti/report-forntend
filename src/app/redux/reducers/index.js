import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contactsApp from "./contactsApp"
import auth from "./auth"

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        contactsApp: contactsApp,
        auth: auth
    });
};

export default exportReducers;

