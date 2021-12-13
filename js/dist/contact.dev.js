"use strict";

$(function () {
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function submitError($form, event, errors) {},
    submitSuccess: function submitSuccess($form, event) {
      event.preventDefault();
      var name = $("input#name").val();
      var email = $("input#email").val();
      var subject = $("input#subject").val();
      var message = $("textarea#message").val();
      $this = $("#sendMessageButton");
      $this.prop("disabled", true);
      $.ajax({
        url: "contact.php",
        method: "POST",
        data: {
          name: name,
          email: email,
          subject: subject,
          message: message
        },
        cache: false,
        success: function success() {
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-success').append("<strong>Tu mensaje ha sido enviado. </strong>");
          $('#success > .alert-success').append('</div>');
          $('#contactForm').trigger("reset");
        },
        error: function error() {
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Lo sentimos " + name + ", parece que nuestro servidor de e-mail no está respondiendo. Por favor, intenta denuevo más tarde!"));
          $('#success > .alert-danger').append('</div>');
          $('#contactForm').trigger("reset");
        },
        complete: function complete() {
          setTimeout(function () {
            $this.prop("disabled", false);
          }, 1000);
        }
      });
    },
    filter: function filter() {
      return $(this).is(":visible");
    }
  });
  $("a[data-toggle=\"tab\"]").click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});
$('#name').focus(function () {
  $('#success').html('');
});