import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';


describe('Test in authReducer', () => {
    
    test('Should login', () => {

        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Sample'
            }
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid: 'abc',
            name: 'Sample'
        })

        
    })

    test('Should logout', () => {

        const initState = {
            uid: 'jagdfjahdsf127362718',
            name: 'Sample'
        };

        const action = {
            type: types.logout,
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual({});
 
    })

    test('Should not change state', () => {

        const initState = {
            uid: 'jagdfjahdsf127362718',
            name: 'Sample'
        };

        const action = {
            type: 'asdjkasd',
        };

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );
    })
})
