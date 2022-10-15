const l = window.location;
const url = encodeURIComponent(l).replace("+", "%2B")
let commentList = ''
const timeAgoSince = (date) => {
    const parse = Date.now() - Date.parse(date)
    const seconds = Math.floor(parse / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}
const run = async () => {
    const res = await fetch("http://localhost:8080/comment?u=" + url);
    const data = await res.json();
    for (const comment of data || []) {
        commentList +=
            `
<div>
    <span style="display:block">
        👱🏿 ${comment?.name} 
    </span>
    <span style="font-size:13px;padding-left:10px;color:grey">
     ${timeAgoSince(comment.time)}
    </span>

    <div id="commentBody">
       ${comment?.comment}
    </div>
    <!-- <div id="likeReply">
        <button id="like">Like</button>
        <button id="reply"> Reply </button>
        <button id="flag"> Flag </button>
    </div>-->
</div>
        `
    }




    const fullBody = `
<div>
<style>
    #commentBox {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        width: 100%;
        max-width: 300px;
    }

    #commentBox input,
    #commentBox textarea {
        padding: 4px 10px;
        border: 2px solid rgb(182, 182, 182);
        border-radius: 8px;
        height: 25px;
        font-size: 18px;
    }


    #commentBox input:focus,
    #commentBox textarea:focus,
    input:active {
        box-shadow: #ff7458 0px 25px 20px -20px;
        outline: none;
        transition: 500ms;
    }


    #commentBox * {
        width: 100%;
    }

    #commentText {
        resize: none;
        min-height: 150px;
    }



    #btnComment {
        width: fit-content;
        font-size: 18px;
        padding: 8px;
        text-align: center;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        border-radius: 10px;
        border: 0px;
        box-shadow: 0px 0px 14px -7px #f09819;
        background-image: linear-gradient(45deg, #FF512F 0%, #F09819 51%, #FF512F 100%);
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    #btnComment:hover {
        background-position: right center;
        /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }

    #btnComment:active {
        transform: scale(0.95);
    }



    #name span {
        font-size: 13px;
    }

    .comment {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .comment>div {
        padding: 5px;
        background-color: rgba(225, 225, 225, 0.493);
        border-radius: 10px;
    }

    .comment div div {
        padding: 5px;
        text-align: justify;
        color: currentColor;
        line-height: 20px;
        margin-left: 5px;
    }

    .comment #commentBody {}

    .comment #likeReply {
        display: flex;
        gap: 5px;
    }

    .comment button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 14px;
        color: blue;
    }
</style>
<div class="comment">
${commentList}
</div>
<form id="commentBox" action="http://localhost:8080/?u=${url}" method="post" enctype="multipart/form-data">
  <div>
      <input type="text" name="name" id="name" placeholder="Name">
  </div>
  <div>
      <textarea name="body" id="commentText" placeholder="Comment" required="true"></textarea>
  </div>
  <div>
      <button id="btnComment">
          Comment
      </button>
      <!-- <input type="submit" value="submit"> -->
  </div>
</form>
</div>
`
    try {
        document.getElementById('commentBox').innerHTML = fullBody
    }
    catch {

    }
}
run()