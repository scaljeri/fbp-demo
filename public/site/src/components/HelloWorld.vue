<style>
    .charts > div {
        height: 400px;
    }
</style>
<template>

    <div ref="container" class="charts">
        <!--<div ref="chartdiv1" style="height:400px"></div>-->
        <!--<div ref="chartdiv2" style="height:400px"></div>-->
    </div>
</template>

<script>
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import * as axios from 'axios';

    am4core.useTheme(am4themes_animated);

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        mounted() {
            /* eslint-disable */ //  no-console */
            // console.log('qwdqw', this.$el.textContent);
            // /* eslint-enable no-console */

            let data = [];
            let ogChart, ogDateAxis;

            axios
                .get('/api/crypto')
                .then(response => (this.info = response))
                .then((resp) => {
                    if (!resp.data && !resp.data.exchanges) {
                        return;
                    }

                    resp.data.exchanges.forEach((data, i) => {
                        const div = document.createElement('div');
                        const x = this;
                        this.$refs.container.appendChild(div);

                        let chart = am4core.create(div, am4charts.XYChart);

                        chart.paddingRight = 20;
                        chart.data = data;
                        console.log(data);

                        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                        dateAxis.renderer.grid.template.location = 0;


                        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                        valueAxis.tooltip.disabled = true;
                        valueAxis.renderer.minWidth = 35;

                        let series = chart.series.push(new am4charts.LineSeries());
                        series.dataFields.dateX = "date";
                        series.dataFields.valueY = "value";

                        series.tooltipText = "{valueY.value}";
                        chart.cursor = new am4charts.XYCursor();

                        if (i === 0) {
                            ogChart = chart;
                            ogDateAxis = dateAxis;

                            let scrollbarX = new am4charts.XYChartScrollbar();
                            scrollbarX.series.push(series);
                            chart.scrollbarX = scrollbarX;
                        } else {
                            ogDateAxis.events.on('selectionextremeschanged', (changed) => {
                                dateAxis.events.disableType('selectionextremeschanged');
                                dateAxis.start = changed.target.start;
                                dateAxis.end = changed.target.end;
                                dateAxis.events.enableType('selectionextremeschanged');
                            });

                            dateAxis.events.on('selectionextremeschanged', (changed) => {
                                ogDateAxis.events.disableType('selectionextremeschanged');
                                ogDateAxis.start = changed.target.start;
                                ogDateAxis.end = changed.target.end;
                                ogDateAxis.events.enableType('selectionextremeschanged');
                            });
                        }
                    });
                });
        },

        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
