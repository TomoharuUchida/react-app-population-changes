import React, { useState, useEffect } from "react";
import axios from "axios";

import { CheckField } from "./CheckField";
import { Graph } from "./Graph";



export const Main = (props) => {
    const [prefectures, setPrefectures] = useState(null);
    const [prefPopulation, setPrefPopulation] = useState([]);
    
    // 都道府県一覧
    const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures"
    // 人口構成
    const populationUrl ="https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=40"

    // 都道府県一覧の取得
    useEffect(() => {
        axios
            .get(url, { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } })
            .then((result) => {
                setPrefectures(result.data);
                console.log(result.data);
            })
            .catch((error) => {})
    }, []);
    
    // チェックボックス操作時の処理
    const handleClickCheck = () => {

        let copy_prefPopulation = prefPopulation.slice();
        axios
            .get(populationUrl, { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } })
            .then((result) => {
                copy_prefPopulation.push({
                    prefName: "福岡県",
                    data:result.data.result.data[0].data,
                })

                setPrefPopulation(copy_prefPopulation);
                // console.log(result.data.result.data[0]);
            })
            .catch((error) => {})
    }
    
    return (
        <main>
            <h2>都道府県</h2>
            {prefectures && (
                <CheckField
                    prefectures={prefectures.result}
                    onChange={handleClickCheck}
                />
            )}
            {prefPopulation && (
                <Graph
                    populationData={prefPopulation}
                />
            )}
        </main>
        )
}