const config = {
	columns: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'],
};

const animations = {
	slideIn: [
		{
			transform: 'translateX(-100%)',
			opacity: 0,
		},
		{
			transform: 'translateX(15%)',
			opacity: 1,
		},
		{
			transform: 'translateX(0)',
		},
	],
	slideOut: [
		{
			transform: 'translateX(0)',
		},
		{
			transform: 'translateX(5%)',
		},
		{
			transform: 'translateX(-100%)',
			opacity: 0,
		},
	],
	moveLeft: [
		{
			backgroundPositionX: '0%',
		},
		{
			backgroundPositionX: '100%',
		},
	],
};

export { config, animations };
