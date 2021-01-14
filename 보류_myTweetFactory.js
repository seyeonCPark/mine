var tableNameF = "FixedTweetsInfo";
var tableNameT = "Twitterians";
var allTweets = JSON.parse(localStorage.getItem(tableNameF)); // 내가 아까 쓴 트윗까지 저장되어있는 arr
var users = JSON.parse(localStorage.getItem(tableNameT));
var userId = request.getParameter("nm_id");

// 다른 곳에서 이동해서 돌아 왔을 때, 고정트윗 말고도, 내가 썼던 트윗이 피드에 있어야함
// tweeter2.html과 twitter2_ippann.html의 onload시 호출할 myTweetFactory()

//보류/////////////////////////////

function myTweetFactory() {
    var matchedTweetArr = [];
    for (var i = 0; i < allTweets.length; i++) {
        if (allTweets[i].eId == userId) {
            matchedTweetArr.push(allTweets[i]);
        }
    }
    // console.log(matchedTweetArr);
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
                $reactionBtn = $("<input>").attr("type", "button").attr("class", "cl_sReaction");
                $reactionBtn.css("backgroundImage", v_reactionPhotosArr[j]);
                if (j == 2) {
                    $reactionBtn.addClass("cl_iine");
                    $reactionBtn.on("click", function () {
                        if (!v_liked) {
                            this.style.backgroundImage = "url(./images/heartful.png)";
                            v_liked = true;
                            return;
                        }
                        else {
                            this.style.backgroundImage = "url(./images/heart.png)";
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
                });

            }
 
            $("#id_feedForMe").prepend($sTweetContainer);

            var sReactionBtnsInTweets = $sTweetContainer.find(".cl_sReaction");
            for (var z = 0; z < sReactionBtnsInTweets.length; z++) {
                sReactionBtnsInTweets[z].addEventListener("mouseover", f_over.bind(null, sReactionBtnsInTweets[z]));
                sReactionBtnsInTweets[z].addEventListener("mouseout", f_out.bind(null, sReactionBtnsInTweets[z]));
            }
        }// for y
    }
}