# simple-js-validator
A simple and bare minimum javascript form data validator.

## Usage
```javascript
import validator from 'simple-js-validator';

const error = validator(value, rulesToCheck);
```
The function return an error message if the input value fails validation and returns empty string if the input value passes validation.

rulesToCheck - It is a string of all the rules separated by pipe `rulesToCheck = "required|date"`

### Rules
* required
* email
* positiveNumber
* integer
* positiveInteger
* mobile
* date
* time
* dateTime
