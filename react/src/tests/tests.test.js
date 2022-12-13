import { fireEvent, render, cleanup, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from '../store';
import CreateBookForm from '../components/Books/CreateBookForm';

jest.mock('../store',() => {
    return {store: { getState:jest.fn(), dispatch: jest.fn(), subscribe: jest.fn() }}
});


describe('Test CreateBookForm', () => {
    beforeEach(() => {
        cleanup();
        render(
            <Provider store={store}>
                <CreateBookForm />
            </Provider>)
       jest.clearAllMocks();
    })
    it('tests create book', async () => {

        const bookName = await screen.findByLabelText('Book Title');
        const bookAuthor = await screen.findByLabelText('Book Author');
        const createButton = await screen.findByTestId('create_book_button');
        fireEvent.change(bookName, { target: { value: 'Forest Gymp' } });
        fireEvent.change(bookAuthor, { target: { value: 'Pushkin' } });

        expect(bookName.value).toBe('Forest Gymp');
        expect(bookAuthor.value).toBe('Pushkin');

        fireEvent.click(createButton);
        expect(store.dispatch).toBeCalledWith({ type: "CREATE_BOOK", payload: {
                title: 'Forest Gymp',
                author: 'Pushkin',
            }});
        expect(bookName.value).toBe('');
        expect(bookAuthor.value).toBe('');
    })

    it('tests error message', async () => {
        const bookName = await screen.findByLabelText('Book Title');
        const bookAuthor = await screen.findByLabelText('Book Author');
        const createButton = await screen.findByTestId('create_book_button');
        fireEvent.change(bookName, { target: { value: '' } });
        fireEvent.change(bookAuthor, { target: { value: '' } });

        expect(bookName.value).toBe('');
        expect(bookAuthor.value).toBe('');

        fireEvent.click(createButton);

        const bookNameError = screen.getByTestId('book-name-error-message')
        const authorNameError = screen.getByTestId('book-author-error-message')

        expect(store.dispatch).not.toBeCalled()

        expect(bookNameError).toBeInTheDocument();
        expect(authorNameError).toBeInTheDocument();
    })
})
