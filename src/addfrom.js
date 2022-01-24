import fs from 'fs';
import prompt from 'prompt';
import Adroute from 'ad-routeman/src/adroute.js';

export default class Addfrom {
	static run(filename) {
		const _dir = 'node_modules/ad-routeman';
		const config = JSON.parse(fs.readFileSync(`${_dir}/data/config.json`));
		let routes = JSON.parse(fs.readFileSync(config.routes_json_file));
		let fileContent = fs.readFileSync(`${config.controllers_route}${filename.slice(-3) === '.ts' ? filename : filename + '.ts'}`).toString();

		let methods = [];
		let className = '';

		//finde the class name
		let classRegex = /(export default class )\w+( )/g;
		let cnMatch = '';
		do {
			cnMatch = classRegex.exec(fileContent);
			if (cnMatch) {
				className = cnMatch[0].split(' ')[3];
			}
		} while (cnMatch);

		//find all methods in the file
		let methodRegex = /(public async )\w+( )/g;
		let match = '';
		do {
			match = methodRegex.exec(fileContent);
			if (match) {
				methods.push(match[0].split(' ')[2]);
			}
		} while (match);

		const properties = [
			{
				name: 'group_prefix',
				description: 'The grouping prefix for your api endpoint',
				validator: /[a-zA-Z\s-]/,
				warning: 'Must be only letters or dashes.',
				required: true,
			},
			{
				name: 'controller_prefix',
				description: 'the default class name to be used on your api endpoint',
				validator: /[a-zA-Z-/]/,
				warning: 'Must be only letters, dashes or slashes.',
				required: true,
			}
		];

		methods.forEach((element) => {
			properties.push({
				name: element,
				description: 'the final path of your api endpoint for the ' + element + ' action',
				default: '/',
				validator: /[a-zA-Z-/]/,
				warning: 'Must be only letters, dashes, slashes or semicolons.',
				
			});
			properties.push({
				name: element + ' http method',
				description: 'the http verb for this specific endpoint',
				default: 'get',
			});
		});

		prompt.start();

		prompt.get(properties, function(err, result) {
			if (err) {
				return onErr(err);
			}
			methods.forEach((element) => {
				Adroute.run(result[element + ' http method'] ,result.group_prefix, result.controller_prefix + result[element], className + '.' + element)
			});
		}, "");

		fs.writeFileSync(config.routes_json_file, JSON.stringify(routes));
	}
}
