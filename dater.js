/*
	LuballSoftware
	Adrian Legaspi
	
	Daterjs v1.0.5

	Improved
*/

class Dater{

	constructor(lang = "es",timezone){

		this.lang = lang;
		this.timezone = timezone;

		this.dateObject = new Date();

		/* Language switch */

		switch(this.lang){
			case "es":
				this.months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
				this.week = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado"];
				this.adv = ["hoy","mañana", "ayer","pasado mañana", "anteayer", "esta semana","este mes","siguiente mes"];
				this.dayMoment = ["media noche","madrugada", "mañana", "medio día", "tarde", "noche"];
			break;

			case "en":
				this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
				this.week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Frdiday","Saturday"];
				this.adv = ["today","tomorrow", "yesterday","past tomorrow", "the day before yesterday", "this week","in this month","next month"];
				this.dayMoment = ["midnight","early morning", "morning", "noon", "afternoon", "night"];
			break;

			case "pt":
				this.months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
				this.week = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
				this.adv = ["hoje","amanhã", "ontem","passado amanhã", "no dia anterior", "esta semana","neste mês","o próximo mês"];
				this.dayMoment = ["meia noite","de manhã cedo", "de manhã", "meio-dia", "tarde", "noite"];
			break;

			default:
				throw new Error("Language was not declared in class Daterjs");
			break;
		}
	}

	objectBuild(dObj){
		/* Daterjs object consturctor */
		if(dObj instanceof Date){
			var date = {
				day: dObj.getDate(),
				month: this.months[dObj.getMonth()],
				monthValue: dObj.getMonth(),
				year: dObj.getFullYear(),
				hour: dObj.getHours(),
				hour12: dObj.getHours(),
				meridiem: "",
				minute: dObj.getMinutes(),
				second: dObj.getSeconds(),
				millisecond: dObj.getMilliseconds(),
				timezone: dObj.toTimeString().substring(9,17),
				dayName: this.week[dObj.getDay()],
				dayMoment: this.getDateMoment(dObj.getHours()+":00:00"),
			}

			if(dObj.getHours() == 0){
				date.hour12 = 12;
			}else if(dObj.getHours() > 12){
				date.hour12 = dObj.getHours()-12;
			}

			if(dObj.getHours() < 12){
				date.meridiem = "AM";
			}else if(dObj.getHours() >= 12){
				date.meridiem = "PM";
			}

			return date;
		}else{
			throw new Error("Daterjs expects Date object to build the Dater object");
		}
		
	}

	mysqlToDate(date){
		/* Parse Mysql date string format to a Javascript Date object */
		var date = date.split(/[- :]/);

		date[1] = date[1]-1;

		if(date[1]== -1){
			date[1] = 11;
		}

		var dateCreated = new Date(date[0],date[1],date[2],date[3],date[4],date[5]);

		return dateCreated;
	}

	getDate(date){
		/* Build a Dater object form a Javascript Date object */
		if(!date){
			var nowObject = new Date();
		}else{
			var nowObject = new Date(date);
		}

		var now = this.objectBuild(nowObject);

		console.log(now); 
		return now;
	}

	upperCaser(str){
		/* Upercases the first letter from the str */
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	getDateAdv(mysqlDate,capital=false){
		/* Adverb refference from today */
		var dateCompare = this.mysqlToDate(mysqlDate);
		var justNow = new Date();

		var adv = "";

		if(dateCompare.getDate() == justNow.getDate() && dateCompare.getMonth() == justNow.getMonth()){
			adv = this.adv[0];
		}else if(dateCompare.getDate() == (justNow.getDate() + 1)){
			adv = this.adv[1];
		}else if(dateCompare.getDate() == (justNow.getDate() - 1)){
			adv = this.adv[2];
		}else if(dateCompare.getDate() == (justNow.getDate() + 2)){
			adv = this.adv[3];
		}else if(dateCompare.getDate() == (justNow.getDate() - 2)){
			adv = this.adv[4];
		}else if(dateCompare.getDate() == (justNow.getDate() + 3)){
			adv = this.adv[5];
		}else if((dateCompare.getDate() > (justNow.getDate() + 3)) && dateCompare.getMonth() == justNow.getMonth()){
			adv = this.adv[6];
		}else if(dateCompare.getMonth() == (justNow.getMonth() + 1)){

			adv = this.adv[7];
		}

		if(capital){
			adv = this.upperCaser(adv);
		}

		return adv;
	}

	getDateMoment(time,capital=false){
		/* Day moment from the time */
		time = time.split(":");		
		var momentObject = new Date();

		momentObject.setHours(time[0]);

		var moment = "";

		if(momentObject.getHours() >= 1 && momentObject.getHours() <= 5){
			moment = this.dayMoment[1];
		}else if(momentObject.getHours() > 5 && momentObject.getHours() < 12){
			moment = this.dayMoment[2];
		}else if(momentObject.getHours()== 12){
			moment = this.dayMoment[3];
		}else if(momentObject.getHours() >= 13 && momentObject.getHours() < 20){
			moment = this.dayMoment[4];
		}else if(momentObject.getHours() >= 20 && momentObject.getHours() <= 23){
			moment = this.dayMoment[5];
		}else if(momentObject.getHours() == 0){
			moment = this.dayMoment[0];
		}

		if(capital){
			moment = this.upperCaser(moment);
		}

		return moment;
	}
}