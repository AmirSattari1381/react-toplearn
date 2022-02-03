import React from "react";
import { Img } from "react-image";
import DotLoader from "react-spinners/DotLoader";
import config from "../../services/config.json";

const ShowImage = ({ image }) => {
    
    return (
        <Img
            src={[
                `${config.localapi}/${image}`,
                "https://via.placeholder.com/150",
            ]}
            loader={
                <div className="text-center mx-auto">
                    <DotLoader loading={true} color={"#ff0ff0"} />
                </div>
            }
        />
    );
};

export default ShowImage;
