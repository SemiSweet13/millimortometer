import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const chartStyles = {
    dial: {
        display: "inline-block",
        width: `300px`,
        height: `auto`,
        color: "#000",
        border: "0.5px solid #fff",
        padding: "2px"
    },
    title: {
        fontSize: "1em",
        color: "#000"

    }
}
const MillimortChart = ({ id, value, title }) => {

    return (
        <div style={chartStyles.dial}>
            <ReactSpeedometer
                maxValue={2}
                minValue={0.0001}                
                height={300}
                width={300}
                ringWidth={120}
                value={value}
                needleTransition="easeElastic"
                needleColor="steelblue"
                needleTransitionDuration={2000}
                segments={25}
                maxSegmentLabels={7}
                fluidWidth={false}
                //customSegmentStops={[0.0001, 0.005, 0.05, 0.5, 1, 2 , 5]}            
                startColor="green"
                endColor="red"
                currentValueText="MilliMort: ${value}"
            />            
        </div>
    )
}
export default MillimortChart