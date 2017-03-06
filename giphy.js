define([
    'base/js/namespace'
], function(Jupyter) {
    var exports = {};
    
    // Ajax request to get the latest trending gifs from giphy
    var get_giphy_url = function() {
      var queryURL = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=2';

      return $.ajax({
        url: queryURL,
        method: 'GET'
      })
    }

    // Set image to a trending gif
    var insert_gif = function() {
        get_giphy_url().done(function(response) {
            console.log("response", response);
            console.log(response.data[0], response.data[0].images);
            console.log(response.data[0].images.fixed_height);
            console.log(response.data[0].images.fixed_height.url);
            var results = response.data;
            var img_url = results[0].images.fixed_height.url;
            selected_cell = Jupyter.notebook.get_selected_cell();
            selected_cell.set_text('<img src="' + img_url + '">');
            Jupyter.notebook.to_markdown();
            Jupyter.notebook.execute_cell_and_select_below();
        });
    }


    // Show Giphy Modal
    var show_giphy = function() {

      var p = $('<p>').text('Click to display a trending gif from giphy.com')
      var div = $('<div>')
      div.append(p)

      function add_giphy() {
          insert_gif();
      }

        // Show a modal dialog with the stats
        Jupyter.dialog.modal({
            body: div,
            title: 'Would you like to show a trending gif?',
            buttons: {
                'Giphy': {
                    class: 'btn-primary',
                    click: add_giphy
                },
                'Cancel': {}
            }
        })
    };

    exports.load_ipython_extension = function() {
        // Register hotkey "g" to show the dialog
        Jupyter.keyboard_manager.command_shortcuts.add_shortcut('g', show_giphy);
    };

    return exports;
});
