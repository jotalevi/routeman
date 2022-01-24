import fs from 'fs';

export default class Blroute {
  static run(){
    const _dir = 'node_modules/ad-routeman';
    const config = JSON.parse(fs.readFileSync(`${_dir}/data/config.json`))
    let routes = JSON.parse(fs.readFileSync(config.routes_json_file))
    let routesOutputStr = config.adonis_import_string + '\n'

    for (var groupKey in routes){
      routesOutputStr += '\nRoute.group(() => {\n'
      routes[groupKey].forEach(element => {
        routesOutputStr += `  Route.${element[0]}('${element[1]}', '${element[2]}')\n`
      })
      routesOutputStr += `}).prefix('${groupKey}')\n`
    }

    fs.writeFileSync(`${config.output_route}${config.output_filename}`, routesOutputStr)
  }
}
