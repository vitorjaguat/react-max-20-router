import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';

// const DUMMY_QUOTES = [
//   {
//     id: 'q1',
//     author: 'Gloria Groove',
//     text: 'Eu desço rebolando pra ti com a mão no popozão.',
//   },
//   {
//     id: 'q2',
//     author: 'Caetano Veloso',
//     text: 'Onde será que tudo começa? A correnteza sem paragem, o viajar de uma viagem.',
//   },
// ];

export default function QuoteDetail() {
  const match = useRouteMatch();
  const { quoteId } = useParams();

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found.</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            show comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${quoteId}`}>
            hide comments
          </Link>
        </div>
      </Route>
    </Fragment>
  );
}
