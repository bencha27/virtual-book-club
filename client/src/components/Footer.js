export default function Footer({ loggedIn }) {
  return (
    <footer className="container-fluid text-center bg-light p-3 position-absolute bottom-0">
      © {new Date().getFullYear()} Virtual Book Club
    </footer>
  );
}