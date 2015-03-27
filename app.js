var PhotoBooth = {
  onMediaStream: function (stream) {
    PhotoBooth.canvas = $('canvas')[0];
    PhotoBooth.context = PhotoBooth.canvas.getContext('2d');

    PhotoBooth.localVideo = $('video')[0];
    PhotoBooth.localVideo.src = window.URL.createObjectURL(stream);
  },
  noStream: function() {
    console.log('oh no!');
  }
};

function countdown(seconds) {
  var countdownDiv = $('.countdown');
  if(seconds == 0) {
    countdownDiv.hide();
    return;
  }

  countdownDiv.html(seconds);
  seconds--;
  setTimeout(function() { countdown(seconds) }, 1000);
}

$('#takePicture').click( function() {
    $('.countdown').show();
    countdown(3);

    setTimeout(function() {
      PhotoBooth.context.drawImage(PhotoBooth.localVideo, 0, 0, 200, 150);
      $('#preview').show();
    }, 3000);
});

$('#sharePicture').click( function() {
  var dataURL = PhotoBooth.canvas.toDataURL();
  var data = {
    phoneNumber: $('#phoneNumber').val(),
    image: dataURL
  };
  $.post(
    'share.php',
    data,
    function(resp, status) {
      alert("You should receive your picture in a few minutes");
    });
});

getUserMedia(
  {video: true},
  PhotoBooth.onMediaStream,
  PhotoBooth.noStream
);
