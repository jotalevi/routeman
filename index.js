/* eslint-disable max-len */

//system imports
import fs from 'fs';
import { exit } from 'process';
import readline from 'readline';

//Default Classes
import Adroute from 'ad-routeman/src/adroute.js';
import Rmroute from 'ad-routeman/src/rmroute.js';
import Blroute from 'ad-routeman/src/blroute.js';
import Addfrom from 'ad-routeman/src/addfrom.js';
import Setting from 'ad-routeman/src/setting.js';

export default class Routeman {
	static run(_inLineParams) {
		const _dir = 'node_modules/ad-routeman';

		//import config
		const config = JSON.parse(fs.readFileSync(`${_dir}/data/config.json`).toString());

		if (_inLineParams.argv[2] === 'create-project-folder') {
			fs.mkdir(config.output_route);
			fs.writeFileSync('ad-routeman/index.js', "require('node_modules/ad-routeman/index.js');");
			exit();
		}

		if (!config.is_set_up && _inLineParams.argv[2] != 'setup') {
			console.log('\n\n\nYou will need to run the setup before you start using rmg.\n');
			console.log('		node routeman setup\n\n');
			exit();
		}

		if (config.is_set_up && _inLineParams.argv[2] != 'setup') {
			switch (_inLineParams.argv[2]) {
				case 'add':
					Adroute.run(
						_inLineParams.argv[3],
						_inLineParams.argv[4],
						_inLineParams.argv[5],
						_inLineParams.argv[6]
					);
					break;
				case 'add-from':
					Addfrom.run(_inLineParams.argv[3]);
					break;
				case 'remove':
					Rmroute.run(_inLineParams.argv[3], _inLineParams.argv[4]);
					break;
				case 'spit':
					let _routes = JSON.parse(fs.readFileSync(_dir + config.routes_json_file));

					for (var groupKey in _routes) {
						_routes[groupKey].forEach((element) => {
							console.log(
								`${element[0]}${' '.repeat(12 - element[0].length)}${groupKey}${element[1]}${' '.repeat(
									50 - (groupKey + element[1]).toString().length
								)}${element[2]}`
							);
						});
					}
					break;
				case 'build':
					Blroute.run();
					break;
				case 'help':
					console.log(fs.readFileSync(`${_dir}/data/readme.md`).toString());
					break;
				case 'settings':
					Setting.run(_inLineParams.argv[3]);
					break;
			}
		} else {
			const rl = readline.createInterface({
				input: _inLineParams.stdin,
				output: _inLineParams.stdout
			});
			rl.question('Do you want to use the default settings? [Y/N] y', function(_useDefaultSettings) {
				if (_useDefaultSettings === 'Y' || _useDefaultSettings === '') {
					rl.close();
				} else {
					rl.question('Do you want to use ES6? [Y/N] y', function(_value) {
						config.use_es5 = !(_value === 'Y' || _value === 'y' || _value === '');
					});

					rl.question('Where do you want to output build files [relative path] ./', function(_value) {
						config.output_route = _value == '' ? './' : _value;
					});

					rl.question('Do you want to use Express format? [Y/N] n', function(_value) {
						config.use_express_format = _value === 'Y' || _value === 'y';
					});

					rl.question('What is your Controllers route? [relative path] [./app/Controllers/Http/] ', function(
						_value
					) {
						config.controllers_route = _value == '' ? './app/Controllers/Http/' : _value;
					});

					rl.question('What is your Models route? [relative path] [./app/Models/]', function(_value) {
						config.models_route = _value == '' ? './app/Models/' : _value;
					});

					rl.question('What is the default grouping path of your service? [api]', function(_r) {
						config.default_api_route_group = _r == '' ? 'api' : _r;
					});
				}
			});

			rl.on('close', function() {
				config.is_set_up = true;
				fs.writeFileSync(`${_dir}/data/config.json`, JSON.stringify(config));
				console.log(config);
				_inLineParams.exit(0);
			});
		}
	}
}
