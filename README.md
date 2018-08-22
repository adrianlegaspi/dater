# Daterjs

Simple library to handle with more options the Date javascript object.

## Getting started
Download the file and include it in your project or use the rawgit to include easier.

### Installing
Development: 
```
https://rawgit.com/aaicca/dater/66a549d425cf053138768317489cdfb0c0441ec5/dater.js
```

Production:
```
https://cdn.rawgit.com/aaicca/dater/66a549d425cf053138768317489cdfb0c0441ec5/dater.js
```

## Usage
Create a new Dater instance:
```
var dater = new Dater();
```
The constructor can be started with 3 languages. Default is spanish
```
new Dater("es"); // Español
new Dater("en"); // English
new Dater("pt"); // Português
```

### getDate(date)
This function returns JSON with the date string if is set or with the default date from the moment
```
var now = dater.getDate();

/*
  'now' JSON object
  {
    day: Day in number,
    month: Month name,
    monthValue: Month in number,
    year: Full year,
    hour: Hour in 24 format,
    hour12: Hour in 12 format,
    meridiem: Meridiem of the day //AM or PM,
    minute: Minutes in number,
    second: Seconds in number,
    millisecond: Milliseconds in number,
    timezone: Default Date javascript object timezone,
    dayName: Day name,
    dayMoment: Moment of the day from the time //Midnight, Early morning, Morning, Afternoon...
  }
*/
```
Print date is just accesing to the json properties
```
now.day+" de "+now.month+" del "+"now.year;

/*
  28 de Febrero del 2018
*/

```

### mysqlToDate(date,dater)
Handles the MySQL datetime default format ('YYYY-MM-DD HH:MM:SS') and returns a Date Javascript object, this is needed because sometimes Date Javascript object has problems with that format. 

If you passes *dater* parameter as true, this function will return a Dater object instead a Date Javascript object. This param is false as default
```
var newDate = dater.mysqlToDate('2018-02-28 12:12:12',true);
```

### getDateAdv(mysqlDate,capital)
Returns the day adverb refferencing the today's date and the date passed as parameter. The expect a date string in 'YYYY-MM-DD HH:mm:ss' format.

If *capital* param is true, the adverb will return with first letter as capital. Default is false
```
dater.getDateAdv('2018-02-28 12:12:12',true);

/*
  Today, Tomorrow, Yesterday, This week, This month... 
*/
```

### getDateMoment(time,capital)
Returns day moment

If *capital* param is true, the momement will return with first letter as capital. Default is false
```
dater.getDateMoment('12:12:12',true);

/*
  Midnight, Early morning, Morning, Noon, Afternoon...
*/
```

### upperCase(str)
This isn't a function of dates but is usedul too. Returns a string with the first letter capitalized.
```
dater.upperCase("lorem ipsum");
/*
  'Lorem ipsum'
*/
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
