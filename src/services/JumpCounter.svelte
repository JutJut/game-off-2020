<script>
	import { jumpCount } from './jumpCounter.service.ts';
	let count_value;

	const unsubscribe = jumpCount.subscribe(value => {
	count_value = value;
	});	

</script>
<h1>Jump counter: {count_value}</h1>
