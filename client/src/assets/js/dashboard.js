// DashBoard JavaScripts

(function ($) {
	'use strict';

	var primary = '#7774e7',
		success = '#37c936',
		info = '#0f9aee',
		warning = '#ffcc00',
		danger = '#ff3c7e',
		primaryInverse = 'rgba(119, 116, 231, 0.1)',
		successInverse = 'rgba(55, 201, 54, 0.1)',
		infoInverse = 'rgba(15, 154, 238, 0.1)',
		warningInverse = 'rgba(255, 204, 0, 0.1)',
		dangerInverse = 'rgba(255, 60, 126, 0.1)',
		gray = '#f6f7fb',
		white = '#fff',
		dark = '#515365'

    var sparklineBarData = [32, 38, 36, 35, 38, 37, 35, 34, 36, 38, 36, 37, 35, 34, 37, 38, 38];
    $("#bar-config").sparkline(sparklineBarData,  
    {
        type: 'bar',
        height: '60',
        barWidth: 3,
        barSpacing: 8,
        barColor: info
    });

})(jQuery);