import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
// import { store } from '../store';
import CreateBookForm from '../components/Books/CreateBookForm';

describe('Test CreateBookForm', () => {
    const dispatchMock = jest.fn()
    const jestSubscribe = jest.fn()
    let store = { getState:jest.fn(), dispatch: dispatchMock, subscribe: jestSubscribe }
    beforeEach(() => {
        store = { getState:jest.fn(), dispatch: dispatchMock, subscribe: jestSubscribe }
    })
    it('tests create book', async () => {
        const utils = render(
            <Provider store={store}>
                <CreateBookForm />
            </Provider>)
        const bookName = await utils.findByLabelText('Book Title');
        const bookAuthor = await utils.findByLabelText('Book Author');
        const createButton = await utils.findByTestId('create_book_button');
        fireEvent.change(bookName, { target: { value: 'Forest Gymp' } });
        fireEvent.change(bookAuthor, { target: { value: 'Pushkin' } });

        expect(bookName.value).toBe('Forest Gymp');
        expect(bookAuthor.value).toBe('Pushkin');

        fireEvent.click(createButton);
        expect(dispatchMock).toBeCalledWith({ type: "CREATE_BOOK", payload: {
                title: 'Forest Gymp',
                author: 'Pushkin',
            }});
        expect(bookName.value).toBe('');
        expect(bookAuthor.value).toBe('');        
    })

    it('tests error message', async () => {
        const utils = render(
            <Provider store={store}>
                <CreateBookForm />
            </Provider>)
        const bookName = await utils.findByLabelText('Book Title');
        const bookAuthor = await utils.findByLabelText('Book Author');
        const createButton = await utils.findByTestId('create_book_button');
        fireEvent.change(bookName, { target: { value: '' } });
        fireEvent.change(bookAuthor, { target: { value: '' } });

        expect(bookName.value).toBe('');
        expect(bookAuthor.value).toBe('');

        fireEvent.click(createButton);

        const bookNameError = utils.getByTestId('book-name-error-message')
        const authorNameError = utils.getByTestId('book-author-error-message')

        expect(dispatchMock).not.toBeCalled()

        expect(bookNameError).toBeInTheDocument();
        expect(authorNameError).toBeInTheDocument();
    })
})