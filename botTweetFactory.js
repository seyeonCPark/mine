
function botTweetFactory() {
    // $("#id_feedForMe").html("");    // 이전 검색결과 클리엉
    // var matchedTweetArr = JSON.parse(localStorage.getItem("partial")); 
    var matchedTweetArr = JSON.parse(localStorage.getItem("test")); 
    if (matchedTweetArr) {  // tweetFactory 나 botTweetFactory 둘 다 호출하지만 둘 중 하나만 실행되어야하므로.

        // console.log(matchedTweetArr);
        // 여기서부터 for문돌아야. matchedTweetArr에 있는 트윗 개수만큼 트윗생성

            // 10개만 보여줄까..?
        for (var y = 0; y < matchedTweetArr.length; y++) {
        // for (var y = 0; y < 10; y++) {
            var $sTweetContainer = $("<div></div>").attr("class", "cl_botsPhotoTweet");
            var $sImg = $("<img></img>").attr("class", "tweetProfImg").css({
                "width": "50px",
                "height": "50px",
                "border-radius": "25px",
                "position": "absolute",
                "left": "10px",
                "top": "13px"
            }).attr("src", "./images/esso.png"); // 임시

            var $sTextarea = $("<textarea cols=15 rows=3></textarea>").attr("readonly", true).attr("class", "cl_sTextarea");
            $sTextarea.val(matchedTweetArr[y].title.replace(/ ?\(.*\)/gi, "") + ", " + matchedTweetArr[y].artistDisplayName + ", " + matchedTweetArr[y].accessionYear); //
            var $sIdDiv = $("<div>dummyId</div>");
            $sIdDiv.html("그림봇");
            var $sNicknameDiv = $("<div>@artisticSpectrum</div>");
            var $sPrimaryImg = $("<img></img>").attr("src", matchedTweetArr[y].primaryImage);
            $sPrimaryImg.css({ "position": "absolute", "width": "300px", "height": "300px", "left": "70px", "top": "95px" });

            $sPrimaryImg.click(function(){
                window.open('showPhoto.html?path=' + $(this).attr("src"),'name','width=480, height=480, left=0');
            });


            $sTweetContainer.append($sImg);
            $sTweetContainer.append($sTextarea);
            $sTweetContainer.append($sIdDiv);
            $sTweetContainer.append($sNicknameDiv);
            $sTweetContainer.append($sPrimaryImg);

            var apartReaction = 10;
            var reactionBtnsNum = 4;
            var v_liked = false;
            var v_reactionPhotosArr = ["url(./images/mention.png)", "url(./images/rt.png)", "url(./images/heart.png)", "url(./images/share.png)"];

            for (var j = 0; j < reactionBtnsNum; j++) {
                // left, background-image값은 버튼마다 다름
                $reactionBtn = $("<input>").attr("type", "button").attr("class", "cl_bReaction");
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
            $sTweetContainer.find(".cl_iine").click(
                function(){
                    $(this).effect("bounce", { times: 4 }, "slow"); 
                }
            );
            $("#id_feedForMe").append($sTweetContainer);

            var bReactionBtnsInTweets = $sTweetContainer.find(".cl_bReaction");
            for (var z = 0; z < bReactionBtnsInTweets.length; z++) {
                bReactionBtnsInTweets[z].addEventListener("mouseover", f_over.bind(null, bReactionBtnsInTweets[z]));
                bReactionBtnsInTweets[z].addEventListener("mouseout", f_out.bind(null, bReactionBtnsInTweets[z]));
            }
        }// for y

    }
}