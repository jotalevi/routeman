import { exit } from 'process';
import fs from 'fs';

export default class Setting {
	static run(data) {
		let key = data.split(':')[0]
		let value = data.split(':')[1]
		const config = JSON.parse(fs.readFileSync('./data/config.json'));
		console.log(`Changed ${key} from ${config[key]} to ${value}`);
		config[key] = value;
		fs.writeFileSync('data/config.json', JSON.stringify(config));
	}
}
