(function (angular, _) {
  'use strict';

  angular
    .module('egen.app.phoneFilter')
    .filter('phone', phoneFilter);

  function phoneFilter() {

    function filter(tel, countryCode) {
      var rez, country, area, number;

      if (!tel) {
        return '';
      }

      countryCode = parseInt(countryCode);

      if (tel.match(/[^0-9]/)) {
        return tel;
      }

      switch (countryCode) {
        case 1: //USA, CA
          country = 1;
          area = tel.slice(0, 3);
          number= tel.slice (3, 6) + ' ' + tel.slice (6);
          rez = ('+' + country + " (" + area + ") " + number).trim();
          break;

        case 91: //INDIA
          country = 91;
          area = tel.slice(0, 5);
          number= tel.slice (5);
          rez = ('+' + country + " " + area + "-" + number).trim();
          break;

        default: //others
          country = countryCode;
          number= tel.slice (0);
          rez = ('+' + country + " " + number).trim();
      }

      return rez;

    }

    return filter;
  }
})(angular, _);


