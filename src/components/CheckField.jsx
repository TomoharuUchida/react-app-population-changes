import React from "react";

export const CheckField = ({ prefectures,onChange }) => {
    
    return (
        <div>
            {prefectures.map((prefecture) => (
                <div key={prefecture.prefName}>
                    <input
                        type="checkbox"
                        name="Prefecture name"
                        onChange={onChange}
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