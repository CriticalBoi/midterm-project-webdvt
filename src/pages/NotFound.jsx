import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page page-narrow">
      <header className="page-header">
        <h1>Page not found</h1>
      </header>
      <p className="empty">
        That page doesn't exist — check the URL, or head back to the dashboard.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to dashboard
      </Link>
    </div>
  );
}
