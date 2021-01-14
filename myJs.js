
var request = {};
request.getParameter = function (arg) {
    var v_locationStr = window.location.href;
    if (v_locationStr.indexOf("?") == -1) return null;
    v_locationStr = v_locationStr.split("?")[1];
    var v_questions = v_locationStr.split("&"); //["nm_name=박세연","nm_sex=female"]
    for (var i = 0; i < v_questions.length; i++) {
        var v_eachItems = v_questions[i].split("="); //["nm_name","박세연","nm_sex","female"]
        if (v_eachItems[0] == arg) {
            return decodeURIComponent(v_eachItems[1]);
            break;
        }
    }
}

request.getParameterValues = function (arg) {
    var returnArr = [];
    var v_locationStr = window.location.href;
    if (v_locationStr.indexOf("?") == -1) return null;
    v_locationStr = v_locationStr.split("?")[1];
    var v_questions = v_locationStr.split("&"); //["nm_name=박세연","nm_sex=female"]
    for (var i = 0; i < v_questions.length; i++) {
        var v_eachItems = v_questions[i].split("=");
        //["nm_name","박세연"]
        //["nm_sex","female"]
        //["nm_sex","male"]

        // for (; v_eachItems[0] == arg;) { //true라서 무한루프, female만 계속 배열에 push됨
        //     returnArr.push( decodeURIComponent(v_eachItems[1]) );
        //     console.log(returnArr);
        // }
        if (v_eachItems[0] == arg) {
            returnArr.push(decodeURIComponent(v_eachItems[1]));
        }
    }
    return returnArr;
}

// 선택자 이름 주면 해당 스타일을 리턴하는 함수
function styleEasyAccess(p_selector) {
    var sheet = document.styleSheets[0];
    for (var i = 0; i < sheet.cssRules.length; i++) {
        if (sheet.cssRules[i].selectorText == p_selector) {
            return sheet.cssRules[i].style;
        }
    }
}

function f_over(arg) {
    arg.style.backgroundColor = "rgba(133, 213, 252,0.282)";
    arg.style.border = "1px solid rgba(133, 213, 252,0.282)";
    arg.style.color = "rgb(28, 164, 244)";
}
function f_out(arg) {
    arg.style.backgroundColor = "transparent";
    arg.style.border = "1px solid transparent";
    arg.style.color = "black";
}