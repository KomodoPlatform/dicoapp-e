// @flow

const numRegex = /^\d+$/;
const MONTH_ARRAY_LIST = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const DAY_OF_WEEK_ARRAY_LIST = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

function validateDate(d) {
  // eslint-disable-next-line no-param-reassign
  if (numRegex.test(d) === true && typeof d === 'string') d = Number(d);
  const dateObj = new Date(d);
  if (dateObj && dateObj.toString().search(/invalid/gi) !== -1) return null;
  return dateObj;
}

const yearOption = { option: 'utc', format: 'yy' };
type YearOption = {
  option: string,
  format: string
};

function getYear(d, { option, format }: YearOption = yearOption) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const year = (option === 'utc'
        ? dateObj.getUTCFullYear()
        : dateObj.getFullYear()
      ).toString();
      return format === 'yy' ? year.substr(2, 2) : year;
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

type AppendZeroOption = {
  width: number,
  lastPosition: boolean
};
const appendZeroOption = { width: 2, lastPosition: false };

function appendZero(
  number,
  { width, lastPosition }: AppendZeroOption = appendZeroOption
) {
  let numString =
    number !== null && number !== undefined ? number.toString() : '0';
  while (numString.length < width) {
    if (lastPosition === true) numString += '0';
    else numString = `0${numString}`;
  }
  return numString;
}

const monthOption = { option: 'utc', format: 'MMM' };
type MonthOption = {
  option: string,
  format: string
};

function getMonth(d, { option, format }: MonthOption = monthOption) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const month =
        option === 'utc' ? dateObj.getUTCMonth() + 1 : dateObj.getMonth() + 1;
      if (format === 'MMMM') return MONTH_ARRAY_LIST[month - 1];
      if (format === 'MMM') return MONTH_ARRAY_LIST[month - 1].substr(0, 3);
      return appendZero(month);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

const dateOption = { option: '' };
type DateOption = {
  option: string
};

function getDate(d, { option }: DateOption = dateOption) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const date = option === 'utc' ? dateObj.getUTCDate() : dateObj.getDate();
      return appendZero(date);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

function get12HoursFormat(hour, option) {
  if (option === '12') return hour > 12 ? hour - 12 : hour;
  return hour;
}

const hourOption = { option: '', format: '12' };
type HourOption = {
  option: string,
  format: string
};

function getHours(d, { option, format }: HourOption = hourOption) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const hours =
        option === 'utc' ? dateObj.getUTCHours() : dateObj.getHours();
      return appendZero(get12HoursFormat(hours, format));
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

function getMinutes(d, option: string = '') {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const minutes =
        option === 'utc' ? dateObj.getUTCMinutes() : dateObj.getMinutes();
      return appendZero(minutes);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

function getSeconds(d, option: string = '') {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const seconds =
        option === 'utc' ? dateObj.getUTCSeconds() : dateObj.getSeconds();
      return appendZero(seconds);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

function getMilliseconds(d, option: string = '') {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const ms =
        option === 'utc'
          ? dateObj.getUTCMilliseconds()
          : dateObj.getMilliseconds();
      return appendZero(ms, {
        width: 3,
        lastPosition: false
      });
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

const dayOfWeek = { option: '', format: 'dddd' };
type DayOfWeek = {
  option: string,
  format: string
};

function getDayOfWeek(d, { option, format }: DayOfWeek = dayOfWeek) {
  try {
    const dateObj = validateDate(d);
    if (dateObj) {
      const dow =
        option === 'utc' ? dateObj.getUTCDay() + 1 : dateObj.getDay() + 1;
      if (format === 'dddd') return DAY_OF_WEEK_ARRAY_LIST[dow - 1];
      if (format === 'ddd') return DAY_OF_WEEK_ARRAY_LIST[dow - 1].substr(0, 3);
      return appendZero(dow);
    }
    return dateObj;
  } catch (e) {
    return null;
  }
}

module.exports = {
  validateDate,
  getYear,
  appendZero,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  getDayOfWeek
};
