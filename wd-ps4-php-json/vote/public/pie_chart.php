<?php
require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'JsonDataController.php';
$config = require dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config.php';
?>

<html>
<head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            let jsonData = <?php echo (new JsonDataController($config['jsonFileName']))->getJsonData(); ?>;

            let dataJsonArr = [['head', 'value']];

            for (let key in jsonData) {
                let item = [key, jsonData[key]];
                dataJsonArr.push(item);
            }

            let data = google.visualization.arrayToDataTable(dataJsonArr);

            let options = {
                title: 'Daily Activities'
            };

            let chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, options);
        }
    </script>
</head>
<body>
<div id="piechart" style="width: 900px; height: 500px;"></div>
</body>
</html>

