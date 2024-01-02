import { Config } from "../config";
import { INSIGHTS_COUNT } from "../events/events";
import Service from "./Service";
import { Utility } from "./Utility";
import { writable, derived } from "svelte/store";
export const Bytes = writable([]);
export const Emojis = writable([]);
export const PollUsers = writable([]);
export const LikedUsers = writable([]);
export const LoggedInUser=writable([]);
export const UpcomingEvents=writable([]);
export var globalSocketObject = null
export const loading = writable([]);
var interVal;
let isAnimationEnable=0;
import socketUtils from "./SocketUtils.js"
var apiCalling;
var byteVar = [];
export let emojiVar = [];
Emojis.subscribe((value) => {
  emojiVar = value;
});
import $, { data } from "jquery";
export async function getByteDetails(feed_id) {
    var obj={};
    // obj.feed_id=feed_id;
    var url = Config.getBaseURL() + "byte/api/getPostDetails/"+feed_id;
    // var url = Config.getBaseURL() + "api/v1/events";
    if(window.location.href.includes("byte_insights")){
        obj.pageType='insight';
      }
//       var checkdata=FeedPosts.find({feed_id:feed_id}).count();
//   if(checkdata>0){
//       $(".shimmerdivFeed").addClass("d-none");
//       $("#mainfeeddiv").removeClass("d-none");
//       return;
//   }
//   if(userDetails && userDetails.length>0){
//     obj.user_name = userDetails[0].name;
//     obj.contact_number=userDetails[0].contact_number;
//     obj.gender=userDetails[0].gender;
//     obj.email=userDetails[0].email;
//     obj.deviceinfo=window.navigator.userAgent;
//     // obj.dob=userDetails[0].dob;
//   }
    obj.user_id = localStorage.getItem('UserId');
    loading.set(true);
    Service.post(url,obj, function (status, response) {
      loading.set(false);
      for (var i = 0; i < response.data.length; i++) {
        var temp = response.data[i];
        if (temp.user_liked_this_post && temp.user_liked_this_post.length > 0) {
          temp.reaction = temp.user_liked_this_post[0].reaction;
        } if (temp.content != undefined && temp.content != null && temp.content != '') {
          temp.content = temp.content.replace('color: rgb(255, 255, 255);', '');
        }
        if (temp.bookmark_details && temp.bookmark_details.length > 0) {
          temp.is_bookmarked = true;
        }
        if (temp.my_comments_count != undefined && temp.my_comments_count.length > 0) {
          temp.myComment = true;
        } else {
          temp.myComment = false;
        }
        temp.lastpost = response.data.lastpost;
        if (temp.like_details_count != undefined && temp.like_details_count.length <= 0) {
          temp.total_likes = 0;
        } else if (temp.like_details_count != undefined && temp.like_details_count.length > 0) {
          temp.total_likes = temp.like_details_count[0].count;
        } else {
          temp.total_likes = 0;
        }
        if (temp.user_liked_this_post != undefined) {
          temp.user_liked = temp.user_liked_this_post.length > 0;
        } else {
          temp.user_liked = false;
        }
        if (temp.post_type == "share") {
          temp.share_post_details = temp.share_post_details[0];
          temp.content = temp.share_post_details.feed_details[0].content;
          temp.post_images = temp.share_post_details.feed_details[0].post_images;
          temp.is_active = true;
          temp.metadata_post = temp.share_post_details.feed_details[0].metadata_post;
          temp.shared_post = true;
          temp.created_at = temp.created_at;
          temp.shared_at = temp.share_post_details.feed_details[0].created_at;
          temp.metadata_details = temp.share_post_details.metadata_details;
        }
        if (temp.special_post_type == "poll" && temp.poll_details[0] != undefined) {
  
          var value = temp.poll_details[0];
          if (value.poll_type == 'users') {
            for (var k = 0; k < value.poll_options.length; k++) {
              value.poll_options[k].poll_option = value.poll_options[k].option_details[0].fullname;
              if (value.poll_options[k].voting_details.length > 0) {
                value.poll_options[k].total_vote = value.poll_options[k].voting_details[0].count
              } else {
                value.poll_options[k].total_vote = 0;
              }
  
            }
          } else {
            for (var k = 0; k < value.poll_options.length; k++) {
              if (value.poll_options[k].voting_details.length > 0) {
                value.poll_options[k].total_vote = value.poll_options[k].voting_details[0].count
              } else {
                value.poll_options[k].total_vote = 0;
              }
  
            }
          }
          if (value.my_voting_details.length > 0) {
            value.is_voted = true;
          } else {
            value.is_voted = false;
          }
          temp.poll_details[0] = value;
        }
        // if (temp.event_details && temp.event_details[0] != undefined && temp.event_details[0].event_invitee_details) {
        //     if (temp.event_details[0].event_invitee_details.length > 0) {
        //         temp.event_details[0].invite_status = temp.event_details[0].event_invitee_details[0].status
        //     } else {
        //         temp.event_details[0].invite_status = 0;
        //     }
        // }
        if (temp.event_invitee_details != undefined) {
          if (temp.event_invitee_details.length > 0) {
            temp.invite_status = temp.event_invitee_details[0].status
          } else {
            temp.invite_status = 0;
          }
        }
  
  
        Bytes.update((value) => [...value, temp]);
      }
      apiCalling = false;
      document.dispatchEvent(new Event("BYTE_DETAIL_LOADED"));
      $("#shimmerdivFeed").addClass('d-none');
      $("#mainfeeddiv").removeClass('d-none');
       loadModalsScript();
      //    $(".shimmerdivFeed").addClass('d-none');
      //    $(".maindiv").removeClass('d-none');
      // if (response.data.length != 0) {
        // const unsub = Events.subscribe((value) => {
        // totalCount = response.total_posts
        // totalCount=response.totalCount;
        // $(".totalCount").text(totalCount)
      // } else {
        // $("#load_more_btn").addClass("d-none");
      // }
    });
  }
  export async function getEmoji(type, lastInsightsTime, limit, filter) {
    var url = Config.getBaseURL() + "byte/api/getEmoji";
    Service.get(url, function (status, response) {
      for (var i = 0; i < response.data.length; i++) {
        var temp = response.data[i];
        Emojis.update((value) => [...value, temp]);
      }
  
    });
  }
  export function getToken() {
    var authToken =
      "Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl9pZF8xNjMzMDM0NjEyNTYyIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjM3MzU4NTF9.jjF7taI-p9E6QauW-zwLfdGHZWybpr_3DDFo8vTrSlw";
    localStorage.setItem("authToken", authToken);
    return localStorage.getItem("authToken");
  }
  export function getemoji(reaction) {
    var data = emojiVar.filter(i => i.emoji == reaction);
    // var data = Emojis.find({ emoji: reaction }).fetch();
    if (data[0] != undefined) {
      return data[0].emojiFile;
    }
    return false;
  }
  export function getUserId() {
    var userId = "user_id_1633034612562";
    localStorage.setItem("UserId", userId);
    return localStorage.getItem("UserId");
  }

  function loadModalsScript() {

    setTimeout(function () {
  
      // loadScript(
      //   "https://vayuzsocial.s3.ap-south-1.amazonaws.com/bitovn-cdn/report-modal/1.7/bundle.js",
      //   function () {
      //     console.log("Loaded");
      //   }
      // );
      loadScript("https://vayuzsocial.s3.ap-south-1.amazonaws.com/bitovn-cdn/insight/insightModals/1.1/bundle.js",
      function () {
        console.log("Loaded");
      });
      loadScript("https://vayuzsocial.s3.ap-south-1.amazonaws.com/bitovn-cdn/document_slider/pdfjs/pdf.js",
      function () {
        console.log("Loaded");
      });
      
    }, 500);
  }
  export function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s;
      s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  function subscribe() {
    Bytes.subscribe((value) => {
      byteVar = value;
    });
  }
  function updateData() {
    Bytes.update((value) => {
      return value;
    });
  }
  export function getSocketObj() {
    setTimeout(function () {
      globalSocketObject = socketUtils.getSocketObj();
  
      globalSocketObject.on("like_post", function (obj) {
        subscribe()
        var requiredItem = byteVar.filter(i => i.feed_id == obj.feed_id);
        if (requiredItem.length > 0) {
          requiredItem[0].total_likes = obj.totalLikes,
            requiredItem[0].updated_at = Date.now()
        }
        updateData()
      });
      globalSocketObject.on("unlike_post", function (obj) {
        subscribe()
        var requiredItem = byteVar.filter(i => i.feed_id == obj.feed_id);
        if (requiredItem.length > 0) {
          requiredItem[0].total_likes = obj.totalLikes,
            requiredItem[0].updated_at = Date.now()
        }
        updateData()
      });
    }, 3000)
  
  }
  export function likeunlikeevent(event){
    subscribe()
    event.preventDefault();
       event.stopPropagation();
       var feed_id=$(event.currentTarget).attr("data-feed-id");
       var feeddata=byteVar.filter(i => i.feed_id == feed_id);
       if ($(window).width() < 960 && feeddata.user_liked == false) {
             if (isAnimationEnable == 0) {
                $(".reactions_" + feed_id).show().css('opacity', '1');
                isAnimationEnable = 1;
                interVal = setInterval(function() {
                   if (isAnimationEnable == 1) {
                         cursorListener(feed_id);
                   }
                }, 500);
             }
             return true;
       }
       $(".like" + feed_id).addClass('is-disabled');
       var obj = {};
       obj.user_id = getUserId();
       var animated = feeddata[0].user_liked;
       var datavalue=$(event.currentTarget).attr('data-value');
       if(datavalue!='' && datavalue!=undefined){
        obj.reaction=datavalue;
       }
       if(obj.reaction!='' && obj.reaction!=undefined && obj.reaction!=feeddata[0].reaction){
              obj.liked = true;
              obj.feed_id = feed_id;
              obj.is_special_post = false;
        }
      else if (!feeddata[0].special_post) {
             obj.feed_id = feed_id;
             obj.liked = !feeddata[0].user_liked;
             obj.is_special_post = false;
       } else {
             obj.is_special_post = true;
             obj.special_post_type = feeddata[0].special_post_type;
             if (feeddata[0].special_post_type == 'news') {
                obj.feed_id = feed_id;
                obj.news_id = feeddata[0].news_id
                obj.liked = !feeddata[0].user_liked;
             } else if (feeddata[0].special_post_type == 'video') {
                obj.feed_id = feed_id;
                obj.video_id = feeddata[0].video_id
                obj.liked = !feeddata[0].user_liked;
             } else if (feeddata[0].special_post_type == 'research') {
                obj.feed_id = feed_id;
                obj.research_id = feeddata[0].research_id;
                obj.liked = !feeddata[0].user_liked;
             } else if (feeddata[0].special_post_type == 'event') {
                obj.feed_id = feed_id;
                obj.event_id = feeddata[0].event_id;
                obj.liked = !feeddata[0].user_liked;
             } else if (feeddata[0].special_post_type == 'group') {
                obj.feed_id = feeddata[0].group_id;
                obj.liked = !feeddata[0].user_liked;
             } else if (feeddata[0].special_post_type == 'poll') {
                obj.feed_id = feed_id;
                obj.poll_id = feeddata[0].poll_id;
                obj.liked = !feeddata[0].user_liked;
             }
             
       }
       obj.oldreaction=feeddata[0].user_liked
       if (!animated) {
             $(event.target).addClass('happy').removeClass('broken');
             // $(event.target).children('span').text(counter);
       } else {
             $(event.target).removeClass('happy').addClass('broken');
             // $(event.target).children('span').text(counter);
       }
       const hearts = document.createElement('div');
       hearts.classList.add('heart-position');
       hearts.innerHTML = '<svg class="heart heart-pop one" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 256C96 167.6 167.6 96 256 96C344.4 96 416 167.6 416 256C416 344.4 344.4 416 256 416C167.6 416 96 344.4 96 256zM280 184C280 170.7 269.3 160 256 160C242.7 160 232 170.7 232 184V328C232 341.3 242.7 352 256 352C269.3 352 280 341.3 280 328V184zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 448C362 448 448 362 448 256C448 149.1 362 64 256 64C149.1 64 64 149.1 64 256C64 362 149.1 448 256 448z"/></svg>';
       event.target.appendChild(hearts);
       if ($(event.currentTarget).hasClass('liked')) {
          $(event.currentTarget).removeClass('liked')
       } else {
          $(event.currentTarget).addClass('liked')
       }
       likeunlike(obj);
       setTimeout(function() {
             event.target.removeChild(hearts);
        }, 3000);
       showemotions();
  }
  export function likeunlike(obj) {
    subscribe();
    var requiredItem = byteVar.filter(i => i.feed_id == obj.feed_id);
    if (requiredItem.length > 0) {
      requiredItem[0].user_liked = false;
      requiredItem[0].reaction = "";
      requiredItem[0].updated_at = Date.now()
    }
    updateData();
    Service.post(
      Config.getBaseURL() + "byte/api/likeunlike",
      obj,
      function (status, response) {
        if (response.code == 200) {
          subscribe();
          $(".like" + obj.feed_id).removeClass('is-disabled');
          var totalLikes = byteVar.filter(i => i.feed_id == obj.feed_id);
          if (totalLikes[0]) {
            var finalLikesCount = totalLikes[0].total_likes;
            if (obj.liked) {
              if(obj.oldreaction!=obj.liked){
                finalLikesCount = totalLikes[0].total_likes + 1;
              }else{
                finalLikesCount = totalLikes[0].total_likes;
              }
              
              Utility.playLikeSound();
            } else {
              finalLikesCount = totalLikes[0].total_likes - 1;
            }
  
            totalLikes[0].user_liked = obj.liked;
            totalLikes[0].likes = finalLikesCount;
            totalLikes[0].reaction = obj.reaction;
            totalLikes[0].total_likes = finalLikesCount;
            totalLikes[0].updated_at = Date.now()
            updateData();
            if (obj.liked) {
              globalSocketObject.emit('like_post', { 'feed_id': obj.feed_id, totalLikes: finalLikesCount })
            } else {
              globalSocketObject.emit('unlike_post', { 'feed_id': obj.feed_id, totalLikes: finalLikesCount })
            }
          }
        }
        document.dispatchEvent(new Event("BYTE_LIKEUNLIKE"));
  
      }
    );
  }
  export function byteDetailRedirection(byte_id) {
    byte_id = Utility.encodeString(byte_id);
    document.dispatchEvent(
      new CustomEvent("REDIRECTION", {
        detail: {
          route: "/byte/" + byte_id,
        },
      })
    );
  }
  export function showemotions() {
    $(document).ready(function() {
   var timer;
   $('.showEmotions').on("mousedown", function(e) {
       timer = setTimeout(function() {
           // alert("WORKY");
       }, 2 * 1000);
   }).on("mouseup mouseleave", function() {
       clearTimeout(timer);
   });
   $(".showEmotions").hover(function(e) {
       var feed_id = $(this).attr('data-feed-id');
             if (isAnimationEnable == 0) {
                $(".reactions_" + feed_id).show().css('opacity', '1');
                isAnimationEnable = 1;
                interVal = setInterval(function() {
                   if (isAnimationEnable == 1) {
                         cursorListener(feed_id);
                   }
                }, 500);
             }
  
       }, function() {
  
       });
  
  
    });
  }
   function cursorListener(feed_id) {
    var isHovered = !!$('.emoji-reactions , .actionBox').
    filter(function() {
       return $(this).is(":hover");
    }).length;
    if (!isHovered) {
       $(".reactions_" + feed_id).hide().css('opacity', '0');
       clearInterval(interVal);
       isAnimationEnable = 0;
       // Session.set('isAnimationEnable', 0)
  
    }
  }
  
  export function votePoll(obj){
    Service.post(
      Config.getBaseURL() + "byte/api/votePoll",
      obj,
      function (status, response) {
        if (response.code == 200) {
          var obj={ 'poll_id': obj.poll_id, option_id: obj.poll_option_id, feed_id: feed_id, type: 'up', user_id: obj.user_id };
          globalSocketObject.emit('poll_vote_update', obj)
          updateVoting(obj)
        }
        document.dispatchEvent(new Event("VOTE_UPDATED"));
  
      }
    );
  }
  export function undoVotePoll(obj){
    Service.post(
      Config.getBaseURL() + "byte/api/undoPoll",
      obj,
      function (status, response) {
        if (response.code == 200) {
          var obj={ 'poll_id': obj.poll_id, option_id: response.data.data, feed_id: obj.feed_id, type: 'down', user_id: obj.user_id };
          globalSocketObject.emit('poll_vote_update', obj)
          updateVoting(obj)
          $("#undoFeedId").val("");
          $("#undoPollId").val("");
          $("#undovotemodal").removeClass('show');
          $("#undovotemodal").hide();
        }
        document.dispatchEvent(new Event("VOTE_UPDATED"));
  
      }
    );
  }
  
  function updateVoting(obj){
    subscribe();
    var data = byteVar.filter(i => i.poll_id == obj.poll_id);
    var polldata = data[0].poll_details;
    for (var i = 0; i < polldata[0].poll_options.length; i++) {
        if (obj.option_id == polldata[0].poll_options[i].poll_option_id) {
            if (obj.type == 'up') {
                polldata[0].poll_options[i].total_vote = polldata[0].poll_options[i].total_vote + 1;
                break;
            } else {
                polldata[0].poll_options[i].total_vote = polldata[0].poll_options[i].total_vote - 1;
                break;
            }
        }
    }
    if (obj.user_id == Utils.getLoggedInUserId() && obj.type == 'up') {
        polldata[0].is_voted = true;
    }
    if (obj.user_id == Utils.getLoggedInUserId() && obj.type == 'down') {
        polldata[0].is_voted = false;
    }
    var obj = {
        poll_id: obj.poll_id,
        option_id: obj.option_id,
        user_id: obj.user_id,
        type: obj.type,
    }
    data[0].poll_details=polldata
    updateData();
  }
  export async function fetchAllPollUsers(poll_id) {
    var url = Config.getBaseURL() + "byte/api/getPollUsers/"+poll_id;
    Service.get(url, function (status, response) {
      for (var i = 0; i < response.data.length; i++) {
        var temp = response.data[i].likes_user_details[0];
        temp.isConnection = response.data[i].isConnection
        PollUsers.update((value) => [...value, temp]);
      }
  
    });
  }
    export async function fetchAllLikeUsers(feed_id) {
      var url = Config.getBaseURL() + "byte/api/getLikeUsers/"+feed_id+"/feed";
      Service.get(url, function (status, response) {
        for (var i = 0; i < response.data.length; i++) {
          var temp = response.data[i].likes_user_details[0];
          temp.isConnection = response.data[i].isConnection
          temp.employment_details = response.data[i].employment_details;
          temp.education_details = response.data[i].education_details;
          temp.reaction = response.data[i].reaction;
          LikedUsers.update((value) => [...value, temp]);
        }
        $(".likedmodalshimmerdiv").addClass("d-none")
        $(".likeduserdiv").removeClass("d-none")
    
      }); 
  }
  export async function fetchLoggedinUser() {
    var obj={};
    obj.user_id=getUserId();
    var url = Config.getBaseURL() + "byte/api/getLoggedInUser/"+obj.user_id;
    Service.post(url,obj, function (status, response) {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        var temp = response.data[i];
        console.log(response.data[i]);
        LoggedInUser.update((value) => [...value, temp]);
      }
    }); 
  }
  export function closeOpenModal(modalid,type){
    if(type=='close'){
      $("#"+modalid).removeClass('show');
      $("#"+modalid).addClass('hide');
      $("#"+modalid).removeAttr('aria-modal');
      $("#"+modalid).attr('aria-hidden', 'true');
      $("#"+modalid).hide();
    }else{
      $("#"+modalid).removeClass('hide');
      $("#"+modalid).addClass('show');
      $("#"+modalid).attr('aria-modal','true');
      $("#"+modalid).removeAttr('aria-hidden');
      $("#"+modalid).show();
    }
  }
  export function dispatchAlertEvent({ action,message,type }) {
    document.dispatchEvent(
      new CustomEvent(action, {
        detail: {
          message: message,
          type: type,
        },
      })
    );
  }