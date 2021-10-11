import React,{useState,useEffect} from "react";
import "./styles.css"

interface GenrePropsType{
    genres: {
        name?: string,
        check?: boolean
    }[],
    onClick: (nameGenre: any) => void
}

function Genre({
    genres,
    onClick
}: GenrePropsType){
    const [dropDown, setDropdow] = useState(false);
    let [rendering, setRendering] = useState(1);
    console.log('genres');

    function setCheckGenre(nameGenre){
        onClick(nameGenre);
    }

    function checkGenre(nameGenre){
        setCheckGenre(nameGenre);
        setRendering(rendering+1);
    }

    return (
        <div className="layout-2 border-bottom">
            <div className="d-flex f-column">
                <div className="option">
                    <div 
                        className="pointer d-flex align-center space-between pd-top-bottom-10 pd-left-right-5"
                        onClick={()=>{setDropdow(!dropDown)}}
                    >
                        <p className="uppercase fs-14 lh-16 color-gray fw-900 mg-0">genre</p>
                        <span className={dropDown === false ? "pd-right-5 spin" : "pd-right-5"}><i className="fa fa-chevron-down"></i></span>
                    </div>
                    <div className=
                        {dropDown === true ? 
                        'overflow-y-auto transition-5ms' : 
                        'drop-down overflow-y-auto transition-5ms'}
                    >
                        {
                            genres.map((genre)=>{
                                return(
                                    <div 
                                        className={genre.check === true ? "pd-top-bottom-10 pd-left-right-5 pointer bgr-gray" : "pd-top-bottom-10 pd-left-right-5 pointer"}
                                        onClick={()=>checkGenre(genre.name)}
                                    >
                                        <div className="d-flex align-center space-between">
                                            <p className="mg-0 fs-15 lh-18">{genre.name}</p>
                                            {
                                                genre.check === true
                                                ?
                                                <span className="pd-right-5"><i className="fa fa-check"></i></span>
                                                :null
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Genre;