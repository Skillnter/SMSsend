/** ----- SMSSend MODULE | START ----- **/
    /** ----- IMPORT MODULES | START ----- **/
        const https = require('https');

    /** ----- IMPORT MODULES | STOP ----- **/

    /* ----- SMS ADMIN FUNCTION | START ------ */
        var SMSAdmin = function() {
            this.url = '<!----- SMS API ------!>';

            this.settings = {
                authkey : {
                    value : '<!----- Authentication Key ------!>',
                    string : 'authkey='
                },
                response : {
                    value : 'json',
                    string : '&response='
                }
            }

            this.configs = {
                sender : {
                    value : '',
                    string : '&sender='
                },
                route : {
                    value : '',
                    string : '&route='
                },
                country : {
                    value : '',
                    string : '&country='
                },
                flash : {
                    value : '',
                    string : '&flash='
                },
                unicode : {
                    value : '',
                    string : '&unicode='
                },
                schtime : {
                    value : new Date(),
                    string : '&schtime='
                },
                afterminutes : {
                    value : '',
                    string : '&afterminutes='
                },
                campaign : {
                    value : '',
                    string : '&campaign='
                }
            }
        };
    /* ----- SMS ADMIN FUNCTION | STOP ------ */

    /* ------ SEND MESSAGE | START ------ */
        SMSAdmin.prototype.sendSMS = function(params){
            this.configuration(params.configs);
            let APIurl = this.url;
            let number = '',message = '';
            if(params.numbers == undefined || params.message == undefined){
                if(params.numbers == undefined){
                    return new Promise((resolve,reject)=>{
                        reject(" Please Enter number ");
                    });
                }else{
                    return new Promise((resolve,reject)=>{
                        reject(" Please Enter message ");
                    });                    
                }
            }else{
                for(let keys in this.settings){
                    APIurl = APIurl + this.settings[keys].string + this.settings[keys].value;
                }
                number = this.setNumber(params.numbers);
                message = this.setMessage(params.message);
                APIurl = APIurl + message + number + this.setURL();
                let temp='';
                console.log(APIurl);
                return new Promise((resolve, reject) => {
                    https.get(APIurl,
                        (res) => {
                            res.setEncoding('utf-8');
                            res.on('data',
                                (data) => {
                                    temp = temp + data;
                                }
                            )

                            res.on('end',
                                () => {
                                    resolve(temp);
                                }
                            );
                        }
                    ).on('error',
                        (error) => {
                            reject(error);
                        }
                    );
                });
            }
        };
    /* ------ SEND MESSAGE | STOP ------ */

    /* ------ SET MESSAGE API | START ------ */
        SMSAdmin.prototype.setMessage = function(params){
            if(params != undefined || params != ""){
                return "&message="+params;
            }else{
                return undefined;
            }
        }
    /* ------ SET MESSAGE API | STOP ------ */

    /* ------ SET NUMBER API | START ------ */
        SMSAdmin.prototype.setNumber = function(params){
            if(params.length > 0){
                let temp = params.join(",");
                return "&mobiles="+temp;
            }else{
                return undefined;
            }
        }
    /* ------ SET NUMBER API | STOP ------ */

    /* ------ SET NUMBER API | START ------ */
        SMSAdmin.prototype.setURL = function(){
            let string = '';
            for(keys in this.configs){
                if(this.configs[keys].value != undefined && this.configs[keys].value != ''){
                    string = string + this.configs[keys].string + this.configs[keys].value;
                }
            }
            return string;
        }
    /* ------ SET NUMBER API | STOP ------ */

    /* ------ SET CONFIGURATION | START ------ */
        SMSAdmin.prototype.configuration = function({
            sender = '' ,
            route = '1' ,
            country = '91' ,
            flash = undefined ,
            unicode = undefined ,
            schtime = undefined ,
            afterminutes = undefined ,
            campaign = ''
        } = {}){
            this.configs.sender.value = sender;
            this.configs.route.value = route;
            this.configs.country.value = country;
            this.configs.flash.value = flash;
            this.configs.unicode.value = unicode;
            this.configs.schtime.value = schtime;
            this.configs.afterminutes.value = afterminutes;
            this.configs.campaign.value = campaign;
        }
    /* ------ SET CONFIGURATION | STOP ------ */

    /* ----- EXPORT ----- */
        module.exports = new SMSAdmin();
/** ----- SMSSend MODULE | FINISH ----- **/