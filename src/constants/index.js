const collections = new Map()
	.set('monday', { title: 'Pondělí' })
	.set('tuesday', { title: 'Úterý' })
	.set('wednesday', { title: 'Středa' })
	.set('thursday', { title: 'Čtvrtek' })
	.set('friday', { title: 'Pátek' })
	.set('done', { title: 'Hotovo' })
	.set('progress', { title: 'Rozpracováno' })
	.set('postpone', { title: 'Odloženo' })
	.set('backlog', { title: 'Backlog', direction: 'row' });

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

export { collections, firebaseConfig, animations };

/*
		db.collection('tasks').doc('11199').set({
			project: 'ProjectX',
			assigne: 'Petr C.',
			label: 'Řešit',
			dueOn: 20201023,
			name: 'Ukol 5',
			link: '',
			estimate: 5,
			collection: 'backlog',
		});
		*/
