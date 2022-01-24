import { exit } from 'process';
import fs from 'fs';

export default class Rmroute {
  static run (methdName, routeName) {
    const config = JSON.parse(fs.readFileSync('./data/config.json'));
    let routes = JSON.parse(fs.readFileSync(config.routes_json_file))

    routeName = routeName[0] === '/' ? routeName : '/' + routeName

    for (var groupKey in routes){
      let i = 0
      routes[groupKey].forEach(element => {
        if (element[0] === methdName && element[1] === routeName) {
          console.log(`The route ${methdName}:${groupKey}${routeName} was removed`)
          routes[groupKey].splice(i, 1)
          fs.writeFileSync(config.routes_json_file, JSON.stringify(routes))
          exit()
        }
        i++
      })
    }
    console.log(`No route was found with the set parameters ${methdName}:*${routeName}`)
  }
}
