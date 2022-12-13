import {reducer} from "../reducer";
import {booksMock} from "../../sagas/tests/books.test";

describe('Test reduser', () => {
    it('test FETCH_BOOKS_FULFILLED', () => {
        expect(reducer(undefined, {type: 'FETCH_BOOKS_FULFILLED', payload: {books: booksMock.data}})).toEqual({
            books: booksMock.data,
            selections: { data: [] }
        })
    })
})