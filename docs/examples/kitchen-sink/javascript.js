angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl', function(moment, alert) {

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.events = [];

    //ADD EVENTS HERE
    $(document).ready(function(){
      $.get("http://swumusic.com/json.html", function(data, status){
        var arr = JSON.parse(data);
        var date, type;

        arr.map(function (X) {
          date = new Date (X["Store Date"]);
          type = 'inverse';

          switch (X["Tracking Priority"]) {
            case 2: type = 'success';
              break;
            case 3: type = 'warning';
              break;
            case 4: type = 'important';
              break;
            default:
          }

          vm.events.push({
            title: X["Content Title"],
            startsAt: date,
            "Adam ID": X["Adam ID"],
            "Artist": X["Artist"],
            "Store Type": X["Store Type"],
            "Genres": X["Genres"],
            "Tracking Priority": X["Tracking Priority"],
            "Featuring Priority": X["Featuring Priority"],
            "Comments": X["Comments"],

            type: type,
            draggable: true,
            resizable: true
          });
        });
      });
    });
    
    vm.isCellOpen = false;

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

  });
