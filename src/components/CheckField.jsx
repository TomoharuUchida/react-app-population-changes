import React,{useState,useEffect} from "react";
import axios from "axios";

export const CheckField = ({ prefectures }) => {
    
    return (
        <div>
            {prefectures.map((prefecture) => (
                <div key={prefecture.prefName}>
                    <input
                        type="checkbox"
                        name="Prefecture name"
                        id={"checkbox" + prefecture.prefCode}
                    />
                    <label
                        htmlFor={"checkbox" + prefecture.prefCode}
                    >
                        {prefecture.prefName.length === 3
                            ? "　" + prefecture.prefName
                            : prefecture.prefName}
                    </label>
                </div>
            ))}
        </div>
    );
};