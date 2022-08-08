import { gql } from '@apollo/client';

//Query logged in user
export const QUERY_ME = gql`
	query Query {
		me {
      _id
      username
			savedBooks {
				bookId
				authors
				description
				title
				image
			}
		}
	}`;