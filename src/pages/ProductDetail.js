import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const params = useParams();
  console.log(params);

  return (
    <section>
      <h1>Product Detail</h1>
    </section>
  );
}
