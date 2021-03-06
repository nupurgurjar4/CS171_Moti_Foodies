let WaffleChart = function() {

    let $_selector,
        $_data,
        $_label,
        $_cellSize,
        $_cellGap,
        $_rows,
        $_columns,
        $_rounded,
        $_keys,
        $_useWidth;

    let defaults = {
        size: 6,
        rows: 50,
        columns: 100,
        rounded: false,
        gap: 2
    };

    function generatedWaffleChart() {

        $_keys = d3V3.keys($_data[0]);

        let obj = {
            selector: $_selector,
            data: $_data,
            label: $_label,
            size: $_cellSize,
            gap: $_cellGap,
            rows: $_rows,
            columns: $_columns,
            rounded: $_rounded
        };

        drawWaffleChart(obj);

    }

    function drawWaffleChart(_obj) {

        if (!_obj.size) { _obj.size = defaults.size; }
        if (!_obj.rows) { _obj.rows = defaults.rows; }
        if (!_obj.columns) { _obj.columns = defaults.columns; }
        if (_obj.gap === undefined) { _obj.gap = defaults.gap; }
        if (_obj.rounded === undefined) { _obj.columns = defaults.rounded; }

        let formattedData = [];
        let domain = [];
        let value = $_keys[$_keys.length - 1];
        let total = d3V3.sum(_obj.data, function(d) { return d[value]; });

        if ($_useWidth) {
            let forcedWidth = d3V3.select(_obj.selector).node().getBoundingClientRect().width;
            _obj.columns = Math.floor(forcedWidth / (_obj.size + _obj.gap));
        }

        let squareVal = total / (_obj.rows * _obj.columns);

        _obj.data.forEach(function(d, i) {
            d[value] = +d[value];
            d.units = Math.floor(d[value] / squareVal);
            Array(d.units + 1).join(1).split('').map(function() {
                formattedData.push({
                    squareVal: squareVal,
                    units: d.units,
                    value: d[value],
                    groupIndex: i
                });
            });
            domain.push(d[$_keys[0]]);
        });

        let hindu_color = "#340744";
        let muslim_color = "#FAD02C";
        let christian_color = "#D6AD60";
        let sikh_color = "#7B6B8D";
        let buddhist_color = "#9A9ABA";
        let jain_color = "#BEAFC2";
        let other_color = "#FFEEC6";
        let not_stated_color = "#F7ECD3";

        // add label

        if (_obj.label) {
            d3V3.select(_obj.selector)
                .append("div")
                .attr("class", "label")
                .text(_obj.label);
        }

        // add legend

        let legend = d3V3.select($_selector)
            .append("div")
            .attr("class", "legend");

        let legendItem = legend.selectAll("div")
            .data(_obj.data);

        legendItem.enter()
            .append("div")
            .attr("class", function(d, i) {
                return "legend_item legend_item_" + (i + 1);
            });

        // let legendIcon = legendItem.append("div")
        //     .attr("class", "legend_item_icon")
        //     .style("background-color", function(d, i) {
        //         if (i === 0) {
        //             return hindu_color;
        //         } else {
        //             return color(i);
        //         }
        //     });

        let legendIcon = legendItem.append("div")
            .attr("class", "legend_item_icon")
            .style("background-color", function(d, i) {
                if (i === 0) {
                    return hindu_color;
                }

                else if (i === 1) {
                    return muslim_color;
                }

                else if (i === 2) {
                    return christian_color;
                }

                else if (i === 3) {
                    return sikh_color;
                }

                else if (i === 4) {
                    return buddhist_color;
                }

                else if (i === 5) {
                    return jain_color;
                }

                else if (i === 6) {
                    return other_color;
                }

                else {
                    return not_stated_color;
                }
            });


        if (_obj.rounded) {
            legendIcon.style("border-radius", "50%");
        }

        legendItem.append("span")
            .attr("class", "legend_item_text")
            .text(function(d) { return d[$_keys[0]]; });

        // set up the dimensions

        let width = (_obj.size * _obj.columns) + (_obj.columns * _obj.gap) - _obj.gap;
        let height = (_obj.size * _obj.rows) + (_obj.rows * _obj.gap) - _obj.gap;

        // margin2 = {top: 20, right: 20, bottom: 20, left: 20};
        // let width = $("#" + vis.parentElement).width() - margin2.left - margin2.right;
        // let height = $("#" + vis.parentElement).height() - margin2.top - margin2.bottom;


        if ($_useWidth) {
            width = d3V3.select(_obj.selector).node().getBoundingClientRect().width;
        }

        // let svg = d3V3.select(_obj.selector)
        //     .append("svg")
        //     .attr("viewBox", `0 0 750 1500`);

        // let svg = d3V3.select(_obj.selector)
        //     .append("svg")
        //     .attr("class", "waffle")
        //     .attr("width", width)
        //     .attr("height", height);

        // let svg = d3V3.select(_obj.selector)
        //     .append("svg")
        //     .attr("class", "waffle")
        //     .attr("width", '100%')
        //     .attr("height", '100%')
        //     .attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
        //     .attr('preserveAspectRatio','xMinYMin');

        // https://stackoverflow.com/questions/17626555/responsive-d3-chart

        let svg = d3V3.select(_obj.selector)
            .append("svg")
            .attr("class", "waffle")
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox','0 0 '+Math.min(width+50)+' '+Math.min(width,height))
            .attr('preserveAspectRatio','xMinYMin');

        let g = svg.append("g")
            .attr("transform", "translate(0,0)");

        // insert dem items

        let item = g.selectAll(".unit")
            .data(formattedData);

        item.enter()
            .append("rect")
            .attr("class", "unit")
            .attr("width", _obj.size)
            .attr("height", _obj.size)
            .attr("fill", function(d) {

                if (d.groupIndex === 0) {
                    return hindu_color;
                }

                else if (d.groupIndex === 1) {
                    return muslim_color;
                }

                else if (d.groupIndex === 2) {
                    return christian_color;
                }

                else if (d.groupIndex === 3) {
                    return sikh_color;
                }

                else if (d.groupIndex === 4) {
                    return buddhist_color;
                }

                else if (d.groupIndex === 5) {
                    return jain_color;
                }

                else if (d.groupIndex === 6) {
                    return other_color;
                }

                else {
                    return not_stated_color;
                }

            })

            .attr("x", function(d, i) {
                let col = Math.floor(i / _obj.rows);
                return (col * (_obj.size)) + (col * _obj.gap);
            })
            .attr("y", function(d, i) {
                let row = i % _obj.rows;
                return (_obj.rows * (_obj.size + _obj.gap)) - ((row * _obj.size) + (row * _obj.gap)) - _obj.size - _obj.gap;
            })
            .append("title")
            .text(function (d, i) {
                return _obj.data[d.groupIndex][$_keys[0]] + ": " + Math.round((d.units / formattedData.length) * 100) + "%";
            });

        if (_obj.rounded) {
            item
                .attr("rx", (_obj.size / 2))
                .attr("ry", (_obj.size / 2));
        }

    }

    generatedWaffleChart.selector = function(value){
        if (!arguments.length) { return $_selector; }
        $_selector = value;
        return generatedWaffleChart;
    }

    generatedWaffleChart.data = function(value){
        if (!arguments.length) { return $_data; }
        $_data = value;
        return generatedWaffleChart;
    }

    generatedWaffleChart.useWidth = function(value){
        if (!arguments.length) { return $_useWidth; }
        $_useWidth = value;
        return generatedWaffleChart;
    }

    generatedWaffleChart.label = function(value){
        if (!arguments.length) { return $_label; }
        $_label = value;
        return generatedWaffleChart;
    }

    generatedWaffleChart.size = function(value){
        if (!arguments.length) { return $_cellSize; }
        $_cellSize = value;
        return generatedWaffleChart;
    }

    generatedWaffleChart.gap = function(value){
        if (!arguments.length) { return $_cellGap; }
        $_cellGap = value;
        return generatedWaffleChart;
    }

    generatedWaffleChart.rows = function(value){
        if (!arguments.length) { return $_rows; }
        $_rows = value;
        return generatedWaffleChart;
    }

    generatedWaffleChart.columns = function(value){
        if (!arguments.length) { return $_columns; }
        $_columns = value;
        return generatedWaffleChart;
    }

    generatedWaffleChart.rounded = function(value){
        if (!arguments.length) { return $_rounded; }
        $_rounded = value;
        return generatedWaffleChart;
    }

    return generatedWaffleChart;

};