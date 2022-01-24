|----------------------------------------------------------------------------------------------
| Routeman
| Version: 0.0.1
| Github : 
|----------------------------------------------------------------------------------------------
|
| This file was created using Routeman, you can use the following commands to 
| manage your routes in you Adonisjs project:
| 
| Add a route:
| node routeman add [http_method] [group_prefix] [route_name] [callback_name]
| node routeman add get api user/:id UserController.getUser
|
| Add a route based on a existing controller:
| node routeman add-from [controller_file_name]
| this will help you create a route for each of the Controllers methods
|
| Remove a route:
| node routeman remove [http_method] [route_name]
| node routeman remove get user/:id
|
| Echo all the registered routes:
| node routeman spit
| 
| Build router files:
| node routeman build
|
| This will create a file called 'routes.ts' in your app's route directory
| you can also change settings such as the output file location and name
| IE:
| node routeman settings [config_name]:[config_value]
| 
| These are the config keys available:
| output_route              : String    default -> "./"
| adonis_import_string      : String    default -> "import Route from '@ioc:Adonis/Core/Route'"
| models_route              : String    default -> "./app/Models"
| controllers_route         : String    default -> "./app/Controllers/Http"
| use_es5                   : Bool      default -> False
| use_express_format        : Bool      default -> False
| routes_json_file          : String    default -> "./routeman/data/routes.json"
| controllers_json_file     : String    default -> "./routeman/data/controllers.json"
|
| Using the command node routeman help will echo this same text, should you ever need it
| 
|----------------------------------------------------------------------------------------------