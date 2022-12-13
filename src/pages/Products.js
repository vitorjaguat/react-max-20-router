import { Link } from 'react-router-dom';

export default function Products() {
  return (
    <section>
      <h1>the PRODUCTS page</h1>
      <ul>
        <li>
          <Link to="/products/p1">a book</Link>
        </li>
        <li>
          <Link to="/products/p2">a carpet</Link>
        </li>
        <li>
          <Link to="/products/p3">an online course</Link>
        </li>
      </ul>
    </section>
  );
}
