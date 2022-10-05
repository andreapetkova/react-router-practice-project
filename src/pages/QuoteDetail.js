import { Fragment } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const DUMMY_DATA = [
  { id: 'q1', author: 'Annie', text: 'Learning React is fun!' },
  { id: 'q2', author: 'Banani', text: 'Learning React is great!' },
];

export const QuoteDetail = () => {
  const match = useRouteMatch()
  const params = useParams();

  const quote = DUMMY_DATA.find((quote) => quote.id === params.id);

  if (!quote) {
    return <NoQuotesFound />;
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
