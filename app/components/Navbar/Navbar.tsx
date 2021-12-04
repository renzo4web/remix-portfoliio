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
					<a href="https://github.com/renzo4web" target={'_blank'}>GitHub</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
