import { exit } from 'process';
import fs from 'fs';

export default class Setting {
	static run(data) {
		const _dir = 'node_modules/ad-routeman';
		const config = JSON.parse(fs.readFileSync(`${_dir}/data/config.json`));

		let key = data.split(':')[0]
		let value = data.split(':')[1]

		console.log(`Changed ${key} from ${config[key]} to ${value}`);
		config[key] = value;

		fs.writeFileSync(`${_dir}/data/config.json`, JSON.stringify(config));
	}
}
