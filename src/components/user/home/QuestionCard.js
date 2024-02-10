import React, {useEffect, useState} from 'react'
import BojImage from '../../../images/boj-logo.png'
import CodilityImage from '../../../images/codility-logo.jpg'
import leetCodeImage from '../../../images/leetCode-logo.png'
import HackerRankImage from '../../../images/hackerRank-logo.png'
import ProgrammersImage from '../../../images/programmers-logo.png'


function QuestionCard(props) {

    const [imageUrl, setImageUrl] = useState(null);
    const handleClick = (e) => {
        e.preventDefault()
        props.getQuestionDetail(props.id);
    }

    useEffect(() => {
        switch (props.fromSource) {
            case 'LEETCODE': setImageUrl(leetCodeImage); break;
            case 'HACKERRANK': setImageUrl(HackerRankImage); break;
            case 'CODILITY': setImageUrl(CodilityImage); break;
            case 'BAEKJOON': setImageUrl(BojImage); break;
            case 'PROGRAMMERS': setImageUrl(ProgrammersImage); break;
            default:
        }
    }, []);

    return (
        <div key={props.id} onClick={handleClick} className="group relative">
            <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={imageUrl}
                    alt={""}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={"#"}>
                            <span aria-hidden="true" className="absolute inset-0"/>
                            {props.title}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{props.registDt}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{props.reviewCount}</p>
            </div>
        </div>
    )
}

export default QuestionCard
