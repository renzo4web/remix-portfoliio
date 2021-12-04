import { Link } from "remix";

const Navbar = () => {
	return (
		<nav aria-label="Main navigation" className="remix-app__header-nav">
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>

					<Link  to="/about">About</Link>
				</li>
				<li>
					<a href="https://github.com/remix-run/remix">GitHub</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
