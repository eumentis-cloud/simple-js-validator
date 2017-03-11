import moment from 'moment';

const timeFormats = ["HH:mm:ss", "HH:mm", "hh:mm:ss a", "hh:mm:ss A", "hh:mm a", "hh:mm A"];
const dateFormats = ["YYYY-MM-DD", "YY-MM-DD"];
const dateTimeFormats = ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD hh:mm:ss A", "YYYY-MM-DD hh:mm:ss a", "YY-MM-DD HH:mm:ss", "YY-MM-DD hh:mm:ss A", "YY-MM-DD hh:mm:ss a"];

const validators = {
    required: (value) => ({
        result: Boolean(value),
        message: 'This field is required!',
        priority: 100,
    }),
    email: (value) => {
        const regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        return {
            result: regex.test(value),
            message: 'Incorrect email entered!',
            priority: 10,
        };
    },
    positiveNumber: (value) => {
        const num = Number(value);
        if (Number.isNaN(num)) {
            return {
                result: false,
                message: 'Only numbers are allowed!',
                priority: 20,
            };
        }
        return {
            result: (num > 0),
            message: 'Number should be greater than zero!',
            priority: 20,
        };
    },
    integer: (value) => ({
        result: (Number.isInteger(Number(value))),
        message: 'Field should have integer value!',
        priority: 10,
    }),
    positiveInteger: (value) => {
        const num = Number(value);
        return {
            result: (Number.isInteger(num) && num > 0),
            message: 'Integer value should be greater than zero!',
            priority: 10,
        };
    },
    mobile: (value) => {
        const regex = /^\d{10}$/;
        return {
            result: regex.test(value),
            message: 'Mobile number incorrect!',
            priority: 10,
        };
    },
    date: (value) => ({
        result: moment(value, dateFormats, true).isValid(),
        message: 'Date is incorrect!',
        priority: 20,
    }),
    time: (value) => ({
        result: moment(value, timeFormats, true).isValid(),
        message: 'Time is incorrect!',
        priority: 20,
    }),
    dateTime: (value) => ({
        result: moment(value, dateTimeFormats, true).isValid(),
        message: 'Timestamp is incorrect!',
        priority: 20,
    }),
};

export default (value, rulesToCheck) => {
    const rulesToCheckArr = rulesToCheck.split('|');
    let message = '';
    let priority = 0;
    rulesToCheckArr.forEach((rule) => {
        if (Object.prototype.hasOwnProperty.call(validators, rule)) {
            const test = validators[rule](value);
            if (!test.result && priority < test.priority) {
                priority = test.priority;
                message = test.message;
            }
        }
    });
    return message;
};
