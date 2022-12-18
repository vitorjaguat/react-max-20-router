import { Fragment, useEffect, useState } from 'react';
import { useParams, Routes, Route, Link, useNavigate } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const QuoteDetail = () => {
  const [showComments, setShowComments] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { quoteId } = params;

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
    return <p>No quote found!</p>;
  }

  const loadHandler = () => {
    setShowComments(true);
  };

  const hideHandler = () => {
    setShowComments(false);
    navigate(`/quotes/${quoteId}`);
  };

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route path={`comments/${quoteId}`} element={<Comments />} />
      </Routes>

      {!showComments && (
        <div className="centered">
          <Link
            className="btn--flat"
            to={`comments/${quoteId}`}
            onClick={loadHandler}
          >
            Load Comments
          </Link>
        </div>
      )}

      {showComments && (
        <div className="centered btn--flat" onClick={hideHandler}>
          Hide Comments
        </div>
      )}
    </Fragment>
  );
};

export default QuoteDetail;
