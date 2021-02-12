export function convertDeltaMilisToTime(date){
    var output;
    var input = new Date() - new Date(date);
    if(input>=31536000000){ //year
        output = Math.floor(input/31536000000) + " year";
    }
    else if(input>=2592000000){ //month
        output = Math.floor(input/2592000000) + " month";
    }
    else if(input>=604800000){ // week
        output = Math.floor(input/604800000) + " week";
    }
    else if(input>=86400000){ // day
        output = Math.floor(input/86400000) + " day";
    }
    else if(input>=3600000){
        output = Math.floor(input/3600000) + " hour";
    }
    else if(input>=60000){ //minute
        output = Math.floor(input/60000) + " minuite";
    }
    else if(input>=1000){ //seconds
        output = Math.floor(input/1000) + " second";
    }
    else{
        output = "now";
    }
    return output;
}