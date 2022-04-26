import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


export const Graph = ({populationData}) => {
    console.log(populationData);
    let series = [];
    let categories = [];

    for (let p of populationData) {
        let data = [];
        // data.push(p.value);
        // categories.push(String(p.year));
        
        for (let pd of p.data) {
            data.push(pd.value);
            categories.push(String(pd.year));
        }

        series.push({
            type: "line",
            name: p.prefName,
            data: data,
        });
    }

    const options = {
        title: {
            text: "総人口推移",
        },
        xAxis: {
            title: {
                text: "年度",
            },
            categories: categories,
        },
        yAxis: {
            title: {
                text: "人口数",
            },
        },
        // 都道府県を一つも選んでいない場合との分岐条件
        series:
            series.length === 0
                ? [{ type: "line", name: "都道府県名", data: [] }]
                : series,
    }



    return (
        <div>グラフ
            <HighchartsReact highcharts= {Highcharts} options={options}/>
        </div>
    )
}