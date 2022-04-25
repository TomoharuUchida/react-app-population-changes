import React, { useState, useEffect } from "react";
import axios from "axios";

import { CheckField } from './CheckField'



export const Main = (props) => {
    const [prefectures, setPrefectures] = useState(null);
    // 都道府県一覧
    const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures"

    useEffect(() => {
        axios
            .get(url, { headers: { "X-API-KEY": process.env.REACT_APP_API_KEY } })
            .then((result) => {
                setPrefectures(result.data);
                console.log(result.data);
            })
            .catch((error) => {})
    },[]);
    
    return (
        <main>
            <h2>都道府県</h2>
            {prefectures && (
                <CheckField
                    prefectures={prefectures.result}
                />
            )}
        </main>
        )
}