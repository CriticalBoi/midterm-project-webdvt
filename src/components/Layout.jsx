import { Container, Nav, Navbar } from 'react-bootstrap';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext.jsx';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/add', label: 'Add' },
  { to: '/summary', label: 'Summary' },
];

// The toggle sets data-bs-theme on <html> (via ThemeContext), so having it
// live here in the shared Navbar — rather than on one page — is what makes
// it reachable, and demonstrably app-wide, from every route at once.
export default function Layout() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <Navbar expand="sm" className="topbar" as="header">
        <Container fluid className="topbar-inner">
          <Navbar.Brand as={Link} to="/" className="wordmark">
            Ledger
          </Navbar.Brand>
          <Nav className="nav" activeKey={location.pathname}>
            {links.map((link) => (
              <Nav.Link
                key={link.to}
                as={NavLink}
                to={link.to}
                end={link.end}
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
          <button
            type="button"
            className="theme-toggle ms-sm-3"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <FiSun /> : <FiMoon />}
            <span className="theme-toggle-label">{theme === 'light' ? 'Light' : 'Dark'}</span>
          </button>
        </Container>
      </Navbar>
      <main className="content">
        <Container fluid className="page-container">
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
