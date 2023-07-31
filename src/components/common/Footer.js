import { useDepartmentQuery } from '../../hooks/useDepartmentQuery';

function Footer() {
	const { data: Department, isSuccess } = useDepartmentQuery();

	return (
		<footer>
			<h1>DCODELAB</h1>
			<p>{`This Company was founded by ${isSuccess && Department[0]?.name} in 2023`}</p>
		</footer>
	);
}

export default Footer;
