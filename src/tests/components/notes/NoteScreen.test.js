import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { activateNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';


jest.mock('../../../actions/notes', () => ({
    activateNote: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Sample'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 1234,
            title: 'Hello',
            body: 'friend',
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>

)

describe('Test in <NoteScreen />', () => {
    test('Should show', () => {
        expect( wrapper ).toMatchSnapshot();
    })

    test('Should trigger active note', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello friend'
            }
        });

        expect( activateNote ).toHaveBeenLastCalledWith(
            1234,
            {
                body: 'friend',
                title: 'Hello friend',
                id: 1234,
                date: 0
            }
        );
    }) 
})
