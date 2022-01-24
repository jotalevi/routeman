import { exit } from 'process';
import fs from 'fs';

export default class Adroute {
	static run(methdName, prefxName, routeName, functName) {
		const _dir = 'node_modules/ad-routeman';
		const config = JSON.parse(fs.readFileSync(`${_dir}/data/config.json`));
		
		let routes = JSON.parse(fs.readFileSync(_dir + config.routes_json_file));

		prefxName = prefxName.slice(-1) === '/' ? prefxName.substring(0, prefxName.length - 1) : prefxName;
		prefxName = prefxName[0] === '/' ? prefxName.slice(1) : prefxName;
		routeName = routeName[0] === '/' ? routeName : '/' + routeName;

		if (routes[prefxName] === undefined) {
			routes[prefxName] = [];
			routes[prefxName].push([ methdName, routeName, functName ]);
		} else {
			let i = 0;
			routes[prefxName].forEach((element) => {
				if (element[0] === methdName && element[1] === routeName) {
					console.log(`The route ${methdName}:${prefxName}${routeName} already exists`);
					exit();
				}
				i++;
			});

			routes[prefxName].push([ methdName, routeName, functName ]);
		}

		console.log(`The route ${methdName}:${prefxName}${routeName} was added`);
		fs.writeFileSync(_dir + config.routes_json_file, JSON.stringify(routes));
	}
}
