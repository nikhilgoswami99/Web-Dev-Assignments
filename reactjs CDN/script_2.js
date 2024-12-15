

const MyReactApp = () => {
    return <div className = "container">
        <h1>Topics covered</h1>
        <p>The following is a list of all the topics we cover in the MDN learning area.</p>
        <a href="">Getting started with the web</a>
        <p id="para">Provides a practical introduction to web development for complete beginners.</p>
        <a href="">HTML — Structuring the web</a>
        <p id="para">HTML is the language that we use to structure the different parts of our content and define what their meaning or purpose is. This topic teaches HTML in detail.</p>
        <a href="">CSS — Styling the web</a>
        <p id="para">CSS is the language that we use to control our web content's style and layout, as well as adding behavior like animation. This topic provides comprehensive coverage of CSS.</p>
    </div>
}

const reactRoot = document.querySelector("#root");
const root = ReactDOM.createRoot(reactRoot);
root.render(<MyReactApp></MyReactApp>);