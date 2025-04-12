import { Link } from "react-router";

export function Header() {
  return (
    <div className="flex items-center justify-between border-b px-4">
      <Link to="/" className="flex items-center h-16 font-semibold">
        My Reservation
      </Link>
      <Link to="/booking">
        Stores
      </Link>
    </div>
  )
}
