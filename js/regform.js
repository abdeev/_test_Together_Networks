$(document).ready(function () {
  $.validator.addMethod(
    "username",
    function (value, element, param) {
      var nameRegex = /^[a-zA-Z0-9]+$/;
      return value.match(nameRegex);
    },
    "Only a-z, A-Z, 0-9 characters are allowed"
  );

  var val = {
    // Specify validation rules
    rules: {
      fname: "required",
      email: {
        required: true,
        email: true,
      },
      username: {
        username: true,
        required: true,
        minlength: 4,
        maxlength: 16,
      },
      password: {
        required: true,
        minlength: 8,
        maxlength: 16,
      },
    },
    // Validation error messages
    messages: {
      email: {
        required: "Email is required field",
        email: "Please enter a valid email address",
      },
      username: {
        required: "Username is required",
        minlength: "Username should be minimum 4 characters",
        maxlength: "Username should be maximum 16 characters",
      },
      password: {
        required: "Password is required",
        minlength: "Password should be minimum 8 characters",
        maxlength: "Password should be maximum 16 characters",
      },
    },
  };
  $("#regForm")
    .multiStepForm({
      defaultStep: 0,
      beforeSubmit: function (form, submit) {
        console.log("called before submiting the form");
        console.log(form);
        console.log(submit);
      },
      validations: val,
    })
    .navigateTo(0);
});
(function ($) {
  $.fn.multiStepForm = function (args) {
    if (args === null || typeof args !== "object" || $.isArray(args))
      throw " : Called with Invalid argument";
    var form = this;
    var tabs = form.find(".tab");
    var steps = form.find(".step");
    steps.each(function (i, e) {
      $(e).on("click", function (ev) {});
    });
    form.navigateTo = function (i) {
      tabs.removeClass("current").eq(i).addClass("current");

      form.find(".prev").toggle(i >= 0);
      var atTheEnd = i >= tabs.length - 1;
      form.find(".next").toggle(!atTheEnd);

      form.find(".submit").toggle(atTheEnd);
      fixStepIndicator(curIndex());
      return form;
    };
    function curIndex() {
      return tabs.index(tabs.filter(".current"));
    }
    function fixStepIndicator(n) {
      steps.each(function (i, e) {
        if (i == n) $(e).addClass("active");
      });
    }
    function fixStepIndicatorRemove(n) {
      steps.each(function (i, e) {
        if (i == n) $(e).removeClass("active");
      });
    }

    form.find(".prev").click(function () {
      fixStepIndicatorRemove(curIndex());
      if (curIndex() !== 0) form.navigateTo(curIndex() - 1);
    });

    form.find(".next").click(function () {
      if (
        "validations" in args &&
        typeof args.validations === "object" &&
        !$.isArray(args.validations)
      ) {
        if (
          !("noValidate" in args) ||
          (typeof args.noValidate === "boolean" && !args.noValidate)
        ) {
          form.validate(args.validations);
          if (form.valid() == true) {
            form.navigateTo(curIndex() + 1);
            return true;
          }
          return false;
        }
      }
      form.navigateTo(curIndex() + 1);
    });
    form.find(".submit").on("click", function (e) {
      e.preventDefault();
      if (
        typeof args.beforeSubmit !== "undefined" &&
        typeof args.beforeSubmit !== "function"
      )
        args.beforeSubmit(form, this);
      if (
        typeof args.submit === "undefined" ||
        (typeof args.submit === "boolean" && args.submit)
      ) {
        form.submit(console.log(args.submit));
      }
      return form;
    });
    typeof args.defaultStep === "number"
      ? form.navigateTo(args.defaultStep)
      : null;
    form.noValidate = function () {};
    return form;
  };
})(jQuery);
