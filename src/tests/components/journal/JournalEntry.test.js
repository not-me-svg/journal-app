import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activateNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
    id: 10,
    date: 0,
    title: 'Hello',
    body: 'Friend',
    url: 'https://somewhere.com/foto.jpg'
};

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry { ...nota }  /> 
    </Provider>
)

describe('Test in <JournalEntry />', () => {
    test('Should show', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Should activate note', () => {
        wrapper.find('.ja__journal-entry').prop('onClick')();
        expect( store.dispatch ).toHaveBeenCalledWith(
            activateNote( nota.id, { ...nota } )
        );
    })
})
