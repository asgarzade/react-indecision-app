const appRoot = document.getElementById("app");

const app = {
    title: "Indecision App",
    subtitle: "Let the computer decide your faith",
    options: []
}

renderTemplate();

function onFormSubmit(e) {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if (option) {
        app.options.push(option);
        e.target.elements.option.value = "";
        renderTemplate();
    }
}

function onRemoveAll() {
    app.options = [];
    renderTemplate()
}

function onMakeDecision() {
    const randomNum = Math.floor(Math.random() * app.options.length)
    alert(app.options[randomNum]);
}

function renderTemplate() {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What Should I Do?</button><br /><br />
            <p>{(app.options && app.options.length) > 0 ? "Here are your options:" : "No Options"}</p>
            <ol>
            {
                app.options.map(option => {
                    return <li key={option}>{option}</li>;
                })
            }
            </ol>
            <button onClick={onRemoveAll}>Remove All</button><br /><br />
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"></input>
                <button>Add Option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);
}