export function convertStringtoEmoji(emojiStr){
    if(emojiStr === "grinning-face"){
        return "😀";
    }
    else if(emojiStr === "grinning-face-with-big-eyes"){
        return "😃";
    }
    else if(emojiStr === "grinning-face-with-smiling-eyes"){
        return "😄";
    }
    else if(emojiStr === "persevering-face"){
        return "😣";
    }
    else if(emojiStr === "kissing-face-with-closed-eyes"){
        return "😚";
    }
    else if(emojiStr === "squinting-face-with-tongue"){
        return "😝";
    }
    else if(emojiStr === "handshake"){
        return "🤝";
    }
    else if(emojiStr === "clapping-hands"){
        return "👏";
    }
    else{
        return ""
    }
}