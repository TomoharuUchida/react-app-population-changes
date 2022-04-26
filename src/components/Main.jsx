import React, { useState, useEffect } from "react";
import axios from "axios";

import { CheckField } from "./CheckField";
import { Graph } from "./Graph";



export const Main = (props) => {
    const [prefectures, setPrefectures] = useState(null);
    const [prefPopulation, setPrefPopulation] = useState([]);
    
    // 都道府県一覧
    const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures"
    
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
    const handleClickCheck = (prefName,prefCode,check) => {
        let copy_prefPopulation = prefPopulation.slice();

        // チェックをつけた処理
        if (check) {
            // 既にチェックがあった場合、処理を終える
            if (
                copy_prefPopulation.findIndex((value) => value.prefName === prefName) !== -1
            ) return;

            axios
                .get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode="+String(prefCode),
                    { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } })
                .then((result) => {
                copy_prefPopulation.push({
                    prefName: prefName,
                    data:result.data.result.data[0].data,
                })

                setPrefPopulation(copy_prefPopulation);
                console.log(prefPopulation);
            })
            .catch((error) => {})
        
        //チェックを外した処理 
        } else {
            // チェックを外された県のインデックス番号を取得する
            const deleteIndex = copy_prefPopulation.findIndex(
                (value) => value.prefName === prefName
            );
            // 該当がなければ処理を終える
            if (deleteIndex === -1) return;
            // 既存の配列からチェックが外れた県を外す（削除対象のインデックス番号から1個削除）
            copy_prefPopulation.splice(deleteIndex, 1);
            setPrefPopulation(copy_prefPopulation);
        }

        
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