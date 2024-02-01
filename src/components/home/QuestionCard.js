import React from 'react'

function QuestionCard(props) {
    return (
        <div className="w-full relative group">
            <div className="max-w-80 max-h-80 relative overflow-y-hidden ">
                <div>
                    <img className="w-full h-full" src={props.img}/>
                </div>
            </div>

            <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
                <div className="flex items-center justify-between font-titleFont">
                    <h2 className="text-lg text-primeColor font-bold"> {props.title} </h2>
                    <p className="text-[#767676] text-[14px]">views : {props.reviewCount}</p>
                </div>
                <div>
                    <p className="text-[#767676] text-[14px]">{props.registDt}</p>
                </div>
            </div>
        </div>
    );
}

export default QuestionCard
