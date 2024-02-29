import { ThreeCircles } from "react-loader-spinner";
const Loader = () => {
    return (
        <div>
            <ThreeCircles
                visible={true}
                height="100"
                width="100"
                color="#00CCCC"
                ariaLabel="three-circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}

export default Loader;