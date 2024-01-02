const $ = require("jquery");
import Swiper from "../assets/js/swiper.bundle.min.js";
import { Config } from "../config";
async function showPage(page_no, fid, pdf_url) {
  var _CANVAS = document.querySelector('#pdf-canvas_' + fid);
  var container = document.querySelector("#pdf-container_" + fid);

  container.classList.add("transition"); // Add CSS transition class

  // Disable Previous & Next buttons while page is being loaded
  document.querySelector("#pdf-next_" + fid).disabled = true;
  document.querySelector("#pdf-prev_" + fid).disabled = true;

  // Update current page
  document.querySelector("#pdf-current-page_" + fid).innerHTML = page_no;
  document.querySelector("#page-loader_" + fid).style.display = 'none';

  // Get handle of page
  try {
    var _PDF_DOC = await pdfjsLib.getDocument({ url: pdf_url });
    var page = await _PDF_DOC.getPage(page_no);
  } catch (error) {
    // Handle error
    return;
  }

  // Original width of the pdf page at scale 1
  var pdf_original_width = page.getViewport(1).width;

  // Calculate scale required to fit the canvas width
  var scale_required = _CANVAS.width / pdf_original_width;

  // Get viewport to render the page at required scale
  var viewport = page.getViewport(scale_required);

  // Set canvas height same as viewport height
  _CANVAS.height = viewport.height;

  var view = page.view, // [x1, y1, x2, y2]
    width = view[2] - view[0],
    height = view[3] - view[1];
  var context = _CANVAS.getContext('2d');
  context.scale(scale_required, scale_required);
  _CANVAS.width = width * scale_required;
  _CANVAS.height = height * scale_required;
  var render_context = {
    canvasContext: context,
    viewport: viewport
  };

  try {
    await page.render(render_context);
  } catch (error) {
    // Handle error
    return;
  }

  // Re-enable Previous & Next buttons
  document.querySelector("#pdf-next_" + fid).disabled = false;
  document.querySelector("#pdf-prev_" + fid).disabled = false;

  // Show the canvas and remove the transition class after a short delay
  setTimeout(function () {
    container.classList.remove("transition");
  }, 500); // Adjust the delay as needed
}
export class Utility {
  static swiperslider(feed_id) {
      setTimeout(function () {
      var swiper = new Swiper(".mySwiper_"+feed_id, {
        spaceBetween: 30,
        effect: "fade",
        navigation: {
          nextEl: '.swiper-button-next_'+feed_id,
          prevEl: '.swiper-button-prev_'+feed_id,
        },
        pagination: {
          el: `.swiper-pagination_${feed_id}`,
          clickable: true,
        },
      });
      window.addEventListener('resize', () => swiper.update());
    },1000)
  }
  static isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
  }
  static nextslide(fid,fileurl){
    var currentpage=$("#pdf-current-page_"+fid).text()
    currentpage=parseInt(currentpage)
    if(currentpage != 1)
    document.querySelector("#page-loader_" + fid).style.display = 'block';
        showPage(--currentpage,fid,fileurl);
  }
  static prevslide(fid,fileurl){
    var currentpage=$("#pdf-current-page_"+fid).text()
    currentpage=parseInt(currentpage)
    var totalPages=$("#pdf-total-pages_"+fid).text()
    totalPages=parseInt(totalPages)
    if(currentpage != totalPages)
    var pageLoader = document.querySelector("#page-loader_" + fid);
pageLoader.style.transition = 'transform 0.5s ease';
pageLoader.style.transform = 'translateY(100%)';

// Show the page loader
pageLoader.style.display = 'block';

// Delay the slide-in effect to allow the element to be displayed first
setTimeout(function () {
  pageLoader.style.transform = 'translateY(0)';
}, 1000);
    // document.querySelector("#page-loader_" + fid).style.display = 'block';
        showPage(++currentpage,fid,fileurl);
  }
  static getIdFromURL() {
    return $(location).attr("href").split('/').pop();
  }
  static addParameter(obj, url, keyword, value) {
    if (obj[keyword]) {
      if (url.includes("?")) {
        url = url + "&" + keyword + "=" + value;
      } else {
        url = url + "?" + keyword + "=" + value;
      }
    }
    return url;
  }
  static encodeString(base64) {
    //  btoa(base64);
    return btoa(unescape(encodeURIComponent(base64)));
  }
  static calculate_time_difference(a) {
    var dt = new Date(a);
    var millis = new Date().getTime() - dt.getTime();
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    var hours = (millis / (1000 * 60 * 60)).toFixed(1);

    var days = (millis / (1000 * 60 * 60 * 24)).toFixed(1);
    if (minutes < 1 && seconds < 10) {
      return 'now';
    } else if (minutes < 1 && seconds < 59) {
      return seconds + 's';
    } else if (minutes >= 1 && minutes <= 59) {
      return minutes + 'm';
    } else if (minutes >= 60 && hours < 24) {
      if (Math.floor(hours) == 1 || minutes == 60) {
        return Math.floor(hours) + 'h';
      } else {
        return Math.floor(hours) + 'h';
      }
    } else if (hours > 24) {
      if (Math.floor(days) == 1) {
        return Math.floor(days) + "d";
      } else {
        if (days >= 30) {
          if (days > 365) {
            var years = days / 365;
            return Math.floor(years) + "Y";
          } else if (days < 365) {
            var months = days / 30;
            return Math.floor(months) + "M";
          }

        }
        if (days >= 7) {
          var weeks = days / 7;
          return Math.floor(weeks) + "W";
        } else {
          return Math.floor(days) + "d";
        }
      }
    } else {
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

  }
  static getPrivacyIcon(val, user) {
    if (val == 'public') {
      return ' <i class="icon-color fa-regular fa-globe"></i>';
    }
    else if (val == 'private') {
      return '<i class="icon-color fa-regular fa-lock"></i>'
    } else {
      return '<i class="icon-color fa-regular fa-user-group"></i>';
    }
  }
  static check_if_content_length_is_greater_than_n(string, count) {
    if (string != undefined) {
      string = string.replaceAll('<p><br></p>', '');
      var check = string.match(/<\p>/g);
      if (check != null && check != undefined && check.length > 6) {
        return true;
      }
      string = string.replace(/(<([^>]+)>)/ig, '')
      string = string.replaceAll('<p><br></p>', '');
    }
    if (string && string.replace(/<br *\/?>/gi, "\n").length > count) {
      return true;
    }
    return false;
  }
  static check_if_content_length_is_greater_than_(string, count) {
    if (string != '' && string != undefined) {
      var result = string.match(/(\#\S+\b)/ig);
      if (result != null && result.length > 0) {
        for (i = 0; i < result.length; i++) {
          var w = result[i].replace('</span></span', '')
          w = w.replace('</span', '')
          string = string.replace('<span class="hashtag pointer">' + w + '</span>', w);
        }
      }
      if (string != undefined) {
        var string = string.replace(/(<([^>]+)>)/ig, '')
      }
      if (string && string.replace(/<br *\/?>/gi, "\n").length > count) {
        return true;
      }
    } else {
      return false;
    }
  }
  static trim_characters_0_100(string, count) {
    if (string != undefined) {
      if (string.match(/<\p>/g) != null) {
        var check = string.match(/<\p>/g).length;
        if (check > 6) {
          string = string.split('</p>');
          return string[0] + '</p>' + string[1] + '</p>' + string[2] + '</p>' + string[3] + '</p>' + string[4] + '</p>' + string[5] + '</p>';
        }
      }
    }
    if (string && string.replace(/<br *\/?>/gi, '\n').length > count) {
      return string.substr(0, count);
    } else {
      return string;
    }
  }
  static isHTML(str) {
    var doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
  }
  static isemoji(strin) {
    if (Utility.isHTML(strin)) {
      var $c = $(strin); //Get the JQ object to a var
      $c.find('.ql-emojiblot').remove(); //Remove it from there
      let c = $c.html()
      strin = c;
    }
    if (strin == '' || strin == '<p></p>') {
      return true;
    }
    return false;
  }
  static urlify(text) {
    var urlRegex=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    if (typeof text != 'undefined') {
        let pattern = /[@;:%|]/g;

        text=text.replace(pattern, "");
        const regex = /(<\/?a.*?>)/g;
        text = text.replace(regex, '');
        
        return text.replace(urlRegex, function(url) {
            url = url.replace('</p>', '');
            var url2=url
            if(!url.includes('http')){
                url2='https://'+url
            }
           var urln=url2.split('?');
           urln =urln[0];
            return '<a class="link-color-comment" target="_blank" href="' + url2 + '">' + urln.substr(0,30) + '..</a>';
        })
    }
  }
  static is_usercanComment(value) {
    if (value == false) {
      return false;
    }
    return true;
  }
  static check_media_type_video_detail(array, index, special_post_type) {
    if (special_post_type == 'eventMedia') {
      if (localStorage.getItem('imageindex') != '' && localStorage.getItem('imageindex') != undefined && localStorage.getItem('imageindex') != null) {
        var check = array[localStorage.getItem('imageindex')];
        return check.media_type == 'video';
      }
    }
    if (array == undefined || array.length <= 0) {
      return false;
    }
    if (array) {
      return array[index].media_type == 'video';
    }

  }
  static check_media_type_image_detail(array, index, special_post_type) {
    if (special_post_type == 'eventMedia') {
      if (localStorage.getItem('imageindex') != '' && localStorage.getItem('imageindex') != undefined && localStorage.getItem('imageindex') != null) {
        var check = array[localStorage.getItem('imageindex')];
        return check.media_type == 'image';
      }
    }
    if (array == undefined || array.length <= 0) {
      return false;
    }
    if (array) {
      return array[index].media_type == 'image';
    }

  }
  static fetch_array_position_detail(array, index, special_post_type) {
    if (special_post_type == 'eventMedia') {
      if (Session.get('imageindex') != '' && Session.get('imageindex') != undefined && Session.get('imageindex') != null) {
        var check = array[Session.get('imageindex')];
        if (check) {
          return check.source_link;
        }
      }
    }
    if (array) {
      if (array[index]) {
        return array[index].source_link;
      }
    }

  }
  static fetch_total_comments() {
    var totalcomment = localStorage.getItem('total_comment')
    var totalrepl = localStorage.getItem('total_replies');
    if (totalrepl == '' || totalrepl == undefined || totalrepl == null) {
      totalrepl = 0;
    } else {
      totalrepl = parseInt(totalrepl);
    }
    if (totalcomment != '' && totalcomment != null && totalcomment != undefined) {
      return parseInt(totalcomment) + totalrepl;
    }
    else {
      return 0;
    }
  }
  static check_if_feed_detail() {
    return window.location.href.includes("byte/");
  }
  static replace_content(str) {
    if (str != undefined) {
      return str.replace(/<br *\/?>/gi, '\n');
    }
  }
  static isInsight() {
    if (window.location.href.includes("byte_insights/")) {
      return true;
    } else {
      return false;
    }
  }
  static getDateInYYYY_MM_DD_Format_with_dash(date) {
    //console.log(date);
    //console.log("getDateInYYYY_MM_DD_Format_with_dash");
    var d = new Date(date);
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var months = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    var monthsName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (date < 10) {
      date = '0' + date;
    }
    return {
      date: year + "-" + months[month - 1] + "-" + date,
      date_: months[month - 1] + "-" + date + "-" + year,
      date_mm_dd_yy: months[month - 1] + "/" + date + "/" + year,
      date_dd_mm_yy: date + "-" + months[month - 1] + "-" + year,
      hours: hours,
      minutes: minutes,
      hh_mm: hours + ":" + minutes,
      datetime: year + "-" + months[month - 1] + "-" + date + " " + hours + ":" + minutes,
      datetime_: monthsName[month - 1] + " " + date + ", " + year + " " + hours + ":" + minutes,
      datetime_seconds: hours + ":" + minutes + ":" + seconds,
      datetime_without_time: monthsName[month - 1] + " " + date + ", " + year,
      datetime_without_time_year: monthsName[month - 1] + " " + date
    };
  }
  static isConnection(data) {
    if (data.length > 0) {
      return true;
    }
    return false
  }
  static is_admin() {
    return localStorage.getItem("user_role") == "super_admin";
  }
  static isAdminVisible() {
    if (Utility.is_admin() && !window.location.href.includes("byte_insights")) {
      return true;
    }
    return false;
  }
  static getStyle(details) {
    if (details.post_type == 'share') {
      var data = details.share_post_details;
      if (data.feed_details.length > 0) {
        var type = data.feed_details[0].postBackgroundType;
        var value = data.feed_details[0].postBackground
        var textcolor = data.feed_details[0].postBackgroundText
      }
    } else {
      var type = details.postBackgroundType;
      var value = details.postBackground
      var textcolor = details.postBackgroundText
    }

    if (type == '' || type == 'undefined' || type == null || type == undefined) {
      return {};
    }
    $("#desc" + details.feed_id).addClass("backgroundPost");
    if (type == 'color') {
      $("#desc" + details.feed_id).attr("style", "background-color:" + value);
      return {
        style: 'background-color:' + value,
        class: 'backgroundPost'
      }
    } else if (type == 'gradient') {
      $("#desc" + details.feed_id).attr("style", "background:linear-gradient(" + value + ")");
      return {
        style: "background: linear-gradient(" + value + ")",
        class: 'backgroundPost'
      }
    } else if (type == 'image') {
      $("#desc" + details.feed_id).attr("style", "background-image:url(" + value + ")");
      return {
        style: "background-image: url(" + value + ")",
        class: 'backgroundPost'
      }
    } else {
      $("#desc" + details.feed_id).attr("style", "background:" + value);
      return {
        style: 'background:' + value,
        class: 'backgroundPost'
      }
    }
  }
  static checkfrocontent(contentt) {
    if (contentt != '' && contentt != '<p><br></p>') {
      return true;
    } else {
      return false;
    }
  }
  static check_length_is_greater_than(text, len) {
    if (text != undefined && text.length > len) return true;
    else return false;
  }
  static pastevent(end_date) {
    let d = new Date();
    var startdate = d.getTime();
    if (startdate <= end_date) {
      return false;
    } else {
      return true;
    }
  }
  static isYoutubeurl(url) {
    if (url.includes('youtube')) {
      return true;
    }
    return false;
  }
  static getYoutubeIframe(url) {
    const v = new URL(url).searchParams.get('v');
    if (v == null || v == undefined || v == '') {
      var vid = url.split('/');
      vid = vid[vid.length - 1];
      return `<iframe class="youtubeiframe" src="https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1&fs=0&controls=0&autoplay=0&showinfo=0&version=3&enablejsapi=1&origin=https://social.vayuz.com"
      allowfullscreen></iframe>`;
    }
    return `<iframe class="youtubeiframe" src="https://www.youtube.com/embed/${v}?rel=0&modestbranding=1&fs=0&controls=0&autoplay=0&showinfo=0&version=3&enablejsapi=1&origin=https://social.vayuz.com"
    allowfullscreen></iframe>`;
  }
  static initiateViewer(pdf_url, fid) {
    // loadScript("https://vayuzsocial.s3.ap-south-1.amazonaws.com/bitovn-cdn/document_slider/pdfjs/pdf.js",
      // function () {

        setTimeout(async function () {
          var _CANVAS = document.querySelector('#pdf-canvas_' + fid);
          if (!isCanvasBlank(_CANVAS)) {
            return false;
          }
          $("#pdf-loader_" + fid).hide();
          document.querySelector("#pdf-loader_" + fid).style.display = 'block';
          try {
          var _PDF_DOC = await pdfjsLib.getDocument({ url: pdf_url });
          }
          catch (error) {
            // alert(error.message);
          }
          var _TOTAL_PAGES = _PDF_DOC.numPages;
          document.querySelector("#pdf-loader_" + fid).style.display = 'none';
          document.querySelector("#pdf-contents_" + fid).style.display = 'block';
          document.querySelector("#pdf-total-pages_" + fid).innerHTML = _TOTAL_PAGES;
          showPage(1, fid, pdf_url);
        }, 2000);
        // console.log("Loaded");
      // });
  }

  static check_for_length_5(array) {
    return array.length == 5;
  }
  static check_for_length_4(array) {
    return array.length == 4;
  }
  static check_for_length_3(array) {
    return array.length == 3;
  }
  static greater_than_zero(array) {
    return array > 0;
  }
  static greater_than_3(array) {
    return parseInt(array) > 3;
  }
  static check_for_length_2(array) {
    return array.length == 2;
  }
  static check_for_length_1(array) {
    return array.length == 1;
  }
  static check_media_type_video(array, index) {
    if (array == undefined || array.length <= 0) {
      return false;
    }
    if (array) {
      return array[index].media_type == 'video';
    }
  }
  static fetch_array_position(array, index) {
    if (array) {
      if (array[index]) {
        return array[index].source_link;
      }
    }
  }
  static is_usercanComment(value) {
    if (value == false) {
      return false;
    }
    return true;
  }
  static check_if_feed_detail() {
    return window.location.href.includes("byte/");
  }
  static getliked(feed_data) {
    var data = feed_data.user_liked;
    if (data) {
      return "liked";
    }
    return ''
  }
  static isYoutubeurl(url) {
    if (url.includes('youtube')) {
      return true;
    }
    return false;
  }
  static hasBackground(val) {
    if (val != undefined & val != '' && val != null) {
      return true;
    }
    return false;
  }
  static getimageindex(array) {
    var check = localStorage.getItem('imageindex');
    if (check == null || check == '' || check == undefined) {
      if (array) {
        if (array[0]) {
          return array[0].source_link;
        }
      }
    } else {
      if (array) {
        if (array[check]) {
          return array[check].source_link;
        }
      }
    }
  }
  static isYoutubeurlCheck(data) {
    if (data.length > 0) {
      if (data[0].metadata_details && data[0].metadata_details.metadata_url != undefined) {
        var url = data[0].metadata_details.metadata_url;
        if (url.includes('youtube')) {
          return true;
        }
      }
    }
    return false;
  }

  static getYoutubeIframe(url) {
    const v = new URL(url).searchParams.get('v');

    return `<iframe class="youtubeiframe" src="https://www.youtube.com/embed/${v}?rel=0&modestbranding=1&fs=0&controls=0&autoplay=0&showinfo=0&version=3&enablejsapi=1&origin=https://social.vayuz.com"
    allowfullscreen></iframe>`;
  }
  static addShimmer(count) {
    var shimmer = '';
    var col = 12 / parseInt(count);
    for (let i = 1; i <= parseInt(count); i++) {
      shimmer += '<div class="col-lg-' + col + ' col-md-12 col-sm-12">' +
        '<div class="_4-u2 mbm _2iwp _4-u8 width-shimmer">' +
        '<div class="_2iwo" data-testid="fbfeed_placeholder_story">' +
        '<div class="_2iwq">' +
        '<div class="_2iwr"></div>' +
        '<div class="_2iws"></div>' +
        '<div class="_2iwt"></div>' +
        '<div class="_2iwu"></div>' +
        '<div class="_2iwv"></div>' +
        '<div class="_2iww"></div>' +
        '<div class="_2iwx"></div>' +
        '<div class="_2iwy"></div>' +
        '<div class="_2iwz"></div>' +
        '<div class="_2iw-"></div>' +
        '<div class="_2iw_"></div>' +
        '<div class="_2ix0"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    }
    return shimmer;
  }
  static getCoverImage(img) {
    if (img == '/images/background.jpg') {
      return Config.MainUrlWithoutslash() + img;
    }
    return img;
  }
  static isMobile() {
    if ($(window).width() < 960) {
      return true;
    } else {
      return false;
    }
  }
  static checkifnone(contentt) {
    if (contentt == '<p><br></p>' || contentt == '' || typeof contentt == 'undefined') {
      return 'display_hidden';
    } else {
      return false;
    }
  }
  static checkfrocontent(content) {
    if (content != '' && content != '<p><br></p>') {
      return true;
    } else {
      return false;
    }
  }
  static playLikeSound() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        var notification = new Audio("https://vayuzsocial.s3.ap-south-1.amazonaws.com/bitovn-cdn/byte/byte_assets/like.wav");
        notification.play(); // Chrome
      } else {
        var urlSound = Meteor.absoluteUrl() + "uploads/like.wav";
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/howler/2.1.3/howler.min.js", function () {
          var sound = new Howl({
            src: [urlSound],
            format: 'ogg',
            buffer: true,
            autoplay: true,
            stereo: -1,
            onloaderror: function () {
              //console.log('Load error!');
            },
            onend: function () {
              //console.log('Finished!');
            },
          });

          sound.on('load', function () {
            //console.log('loaded');
            sound.play('blast');

          })
        })
      }
    } else {
      var notification = new Audio("/uploads/ting.ogg");
      notification.play();
    }


  }
  static decodeString(base64) {
    // return Base64.encode(base64);
    try{
      return decodeURIComponent(escape(window.atob(base64)));
    }catch(e){
      
    }
  
  }
}

function isCanvasBlank(canvas) {
  return !canvas.getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height).data
    .some(channel => channel !== 0);
}
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    var s;
    s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

