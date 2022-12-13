import { Route } from 'react-router-dom';

export default function Welcome() {
  return (
    <section>
      <h1>the welcome page</h1>
      <Route path="/welcome/new-user">
        <p>Welcome, new user!</p>
      </Route>
    </section>
  );
}
