var tableNameF = "FixedTweetsInfo";
var tableNameT = "Twitterians";
var allTweets = JSON.parse(localStorage.getItem(tableNameF));
var users = JSON.parse(localStorage.getItem(tableNameT));
var searchWord = request.getParameter("q");

// $("태그네임")으로 create한 element는 jQuery로 만들었어도 jQuery객체가 아니라 htmlElement일 뿐인가??
// 물론 $(this)로 감싸서 콘솔에 찍으면 jQuery객체로 바꿔 리턴해주긴 하지만 원본은 절대 jQuery객체가 아닌건가??
// 그렇다고 보기엔.. 어떨땐 jQuery메소드가 먹고 어떨 땐 안머겅....

// 일단 jQuery객체란 document.querySelector("선택자")한 애들만 해당되는건강.

// 마우스오버, 아웃 시 버튼 색 블루로 변경
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

function tweetFactory() {
    // console.log("i hear you");
    var matchedTweetArr = [];
    if(allTweets.length != 0 && allTweets){

        for (var i = 0; i < allTweets.length; i++) {
            if (allTweets[i].eTextarea.indexOf(searchWord) != -1) {
                matchedTweetArr.push(allTweets[i]);
            }
            else if (allTweets[i].eId.indexOf(searchWord) != -1) {
                matchedTweetArr.push(allTweets[i]);
            }
            else if (allTweets[i].eNickname.indexOf(searchWord) != -1) {
                matchedTweetArr.push(allTweets[i]);
            }
        }
    }
    if (matchedTweetArr.length != 0) {

        // 여기서부터 for문돌아야. matchedTweetArr에 있는 트윗 개수만큼 트윗생성
        for (var y = 0; y < matchedTweetArr.length; y++) {

            var $sTweetContainer = $("<div></div>").attr("class", "cl_searchedTweet").attr("class", "searchTaishouAll");
            var $sImg = $("<img></img>").attr("class", "tweetProfImg").css({
                "width": "50px",
                "height": "50px",
                "border-radius": "25px",
                "position": "absolute",
                "left": "10px",
                "top": "13px"
            }).attr("src", matchedTweetArr[y].eImg);

            var $sTextarea = $("<textarea cols=15 rows=1></textarea>").attr("readonly", true).attr("class", "cl_sTextarea");  // value값으로 matchedArr[i].eTextarea
            $sTextarea.val(matchedTweetArr[y].eTextarea);
            var $sIdDiv = $("<div>dummyNickname</div>");
            $sIdDiv.html(matchedTweetArr[y].eNickname);
            var $sNicknameDiv = $("<div>@dummyId</div>");
            $sNicknameDiv.html(matchedTweetArr[y].eId);

            $sTweetContainer.append($sImg);
            $sTweetContainer.append($sTextarea);
            $sTweetContainer.append($sIdDiv);
            $sTweetContainer.append($sNicknameDiv);

            var apartReaction = 10;
            var reactionBtnsNum = 4;
            var v_liked = false;
            var v_reactionPhotosArr = ["url(./images/mention.png)", "url(./images/rt.png)", "url(./images/heart.png)", "url(./images/share.png)"];

            for (var j = 0; j < reactionBtnsNum; j++) {
                // left, background-image값은 버튼마다 다름
                $reactionBtn = $("<input>").attr("type", "button").attr("class", "cl_sReaction");
                $reactionBtn.css("backgroundImage", v_reactionPhotosArr[j]);
                if (j == 2) {
                    $reactionBtn.addClass("cl_iine");
                    $reactionBtn.on("click", function () {
                        if (!v_liked) {
                            // $(this).css("background-image", "url(./images/heartful.png))");
                            this.style.backgroundImage = "url(./images/heartful.png)";
                            // console.log(v_liked);
                            // console.log(this);
                            // console.log($(this));
                            v_liked = true;
                            return;
                        }
                        else {
                            // $(this).css("backgroundImage", "url(./images/heart.png))");
                            this.style.backgroundImage = "url(./images/heart.png)";
                            // console.log(v_liked);
                            // console.log(this);
                            // console.log($(this));
                            v_liked = false;
                        }
                    });
                }
                $reactionBtn.css("left", "40px");
                $reactionBtn.css("left", parseInt($reactionBtn.css("left")) + apartReaction + "px");
                apartReaction += 90;

                $sTweetContainer.append($reactionBtn);
                $sTweetContainer.on("mouseover", function () {
                    this.style.backgroundColor = "rgba(233,238,242,0.4)";
                });
                $sTweetContainer.on("mouseout", function () {
                    this.style.backgroundColor = "";
                }); ///////////////////////twitter2의 트윗도 이거 넣어야

            }

            $sTweetContainer.find(".cl_iine").click(
                function(){
                    $(this).effect("bounce", { times: 4 }, "slow"); 
                }
            );
            $("#id_feedForMe").append($sTweetContainer);

            // 어차피 함수 안에서 트윗 만들고, 화면에 붙이고, 이벤트 걸고 끝낼 거니까 클래스가 cl_sReaction인 애들 전체 대상이 아닌 sContainer의 하위의 cl_sReaction만.
            // var sReactionBtnsInTweets = $(".cl_sReaction");
            var sReactionBtnsInTweets = $sTweetContainer.find(".cl_sReaction");
            for (var z = 0; z < sReactionBtnsInTweets.length; z++) {
                sReactionBtnsInTweets[z].addEventListener("mouseover", f_over.bind(null, sReactionBtnsInTweets[z]));
                sReactionBtnsInTweets[z].addEventListener("mouseout", f_out.bind(null, sReactionBtnsInTweets[z]));
            }

            // $(".cl_iine").click(function () {
            //     $(this).effect("bounce", { times: 4 }, "slow");
            // });
        }// for y
    }
}