import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String){
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!){
        createUser (username: $username, email:$email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }`;

export const SAVE_BOOK = gql`
    mutation saveBook ($authors: [String], $bookId: String!, $description: String!, $image: String, $link: String, $title: String!) {
        saveBook(authors: $authors, bookId: $bookId description: $description, image:$image, link:$link, title: $title){
            savedBooks {
                _id
                title
                description
                link
                authors
            }
        }
    }`;

export const DELETE_BOOK = gql`
        mutation deleteBook ($bookId: String!) {
            deleteBook (bookId: $bookId){
                    _id
            }
        }`;