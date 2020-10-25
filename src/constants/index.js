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

const firebaseConfig = {
	apiKey: 'AIzaSyBUBxbIAysLwKvMrh4k4Rx5hOl2tp6C2OA',
	authDomain: 'scrum-table-2034c.firebaseapp.com',
	databaseURL: 'https://scrum-table-2034c.firebaseio.com',
	projectId: 'scrum-table-2034c',
	storageBucket: 'scrum-table-2034c.appspot.com',
	messagingSenderId: '444536664353',
	appId: '1:444536664353:web:8f42949d5167b8a5b20e60',
	measurementId: 'G-925LQ42FBG',
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
