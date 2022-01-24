
# Routemanjs

A simple route manager for Adonisjs

Routeman Version: 0.2.1

Author: Eros Talevi

Github: https://github.com/jotalevi/routeman

Instalation
```
npm i routeman
```

# Usage

## Add a route
```
node routeman add [http_method] [group_prefix] [route_name] [callback_name]
```
Ie.
```
node routeman add get api user/:id UserController.getUser
```

| Parameter         | Description                   |
| :--------         | :--------                     |
| `[http_method]`   | The http method of the route  |
| `[group_prefix]`  | The endpoint grouping prefix  |
| `[route_name]`    | The endpoint of the route     |
| `[callback_name]` | The callback for this endpoint|

## Add a route based on a existing controller:
```
node routeman add-from [controller_file_name]
```
This will help you create a route for each of the Controllers methods
Ie.
```
node routeman add-from UsersController.ts
```

| Parameter                 | Description                   |
| :--------                 | :--------                     |
| `[controller_file_name]`  | The name of the file to be used as controller base |

## Remove a route:
```
node routeman remove [http_method] [route_name]
```
Ie.
```
node routeman remove get user/:id
```
| Parameter         | Description                   |
| :--------         | :--------                     |
| `[http_method]`   | The http method of the route  |
| `[route_name]`    | The endpoint of the route     |

## Echo all the registered routes:
```
node routeman spit
```

## Build router files:
```
node routeman build
```

## Settings
```
node routeman settings [config_name]:[config_value]
```
| Parameter             | Description                           |
| :--------             | :--------                             |
| `[config_name]`       | The name of the setting to be updated |
| `[config_value]`      | The new value of the variable         |

## Help
Using the command ```node routeman help``` will echo this same text, should you ever need it
node routeman helà