luminateExtend Widgets
======================

Version: 1.0.0 (25-FEB-2014)  
Requires: jQuery v1.5.1+ or Zepto v1.1+, luminateExtend.js v1.6+, and Bootstrap 3

luminateExtend Widgets are UI components you can easily embed anywhere&mdash;be it on your Wordpress or Drupal website, 
within a mobile app, or on a Facebook Page&mdash;without writing hardly any code.

Getting Started
---------------

Before you can begin using Widgets on your site, you'll need to follow the [basic setup](https://github.com/noahcooper/luminateExtend#libSetup) 
steps for using luminateExtend.js.

Once you've taken care of that, just include the necessary JavaScript file on your page:

``` html
<script src="../js/luminateExtend.widgets.js"></script>
```

Then, at the very bottom of the `<body>`, add the following:

``` html
<script>
luminateExtend.widgets();
</script>
```

Adding Widgets to Your Page
---------------------------

Adding a Widget to a page is as simple as including an HTML tag. Widgets use HTML5 data attributes; each Widget 
has a `data-widget` attribute to identify the type of Widget, with additional attributes for defining other settings.

Constituent Information Widgets
-------------------------------

Constituent Information Widgets display information from the logged in user's constituent record.

``` html
<p>Welcome back, <span data-widget="consinfo" data-field="name.first"></span>!</p>
```

The `data-field` attribute indicates which constituent profile field should be displayed. The list of fields 
available for display varies by organization. To see a complete list of possible fields for your organization, 
open a JavaScript console and run the following:

``` js
luminateExtend.api({
  api: 'cons', 
  data: 'method=listUserFields', 
  callback: function(response) {
    $.each(response.listConsFieldsResponse.field, function() {
      console.log(this.label + ' = ' + this.name);
    });
  }
});
```