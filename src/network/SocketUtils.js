class SocketUtils {
    constructor() {
     // ...
    }
    getSocketObj() {

      var io = require("socket.io-client");
      
      if(window.socket == undefined || window.socket == null){
      
    //   var socket = io.connect(Meteor.absoluteUrl() + "mobile-chat");
    // var socket = io.connect("https://bitovn-commenting-backend.herokuapp.com/"+ "mobile-chat");
    // var socket = io.connect("https://comment-backend.vayuz.com/"+ "mobile-chat");
    // var socket = io.connect("https://insight-backend.vayuz.com/"+ "mobile-chat");
    var socket = io.connect("http://localhost:3100/"+ "mobile-chat");
      window.socket = socket;
      
      }
      
      return window.socket;
      
      }
}
  
  const socketUtils = new SocketUtils();
  
  Object.freeze(socketUtils);

  export default socketUtils;