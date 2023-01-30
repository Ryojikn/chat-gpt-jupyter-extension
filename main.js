define([
    'base/js/namespace',
    'base/js/events'
], function (Jupyter, events) {
    // let env_process = process.env;
    // if ('AZURE_OPENAI' in env_process) {
    //     console.log("Env var is set:", env_process)
    // } else {
    console.log("Env var IS NOT SET")
    var baseURL = "https://api.openai.com/v1/completions"
    var OPENAI_API_KEY = "YOURAPIKEY"
    //    }

    var explain_cell = function () {
        var selectedCell = Jupyter.notebook.get_selected_cell();
        var cellContent = selectedCell.get_text();
        console.log(cellContent);

        // make HTTP request to OpenAI
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + OPENAI_API_KEY
            },

            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: "Explique o código a seguir e retorne o resultado formatado para markdown: " + cellContent,
                temperature: 0.5,
                max_tokens: 2048,
                user: "ryoji"
            })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                // display result in the output of the selected cell

                var insert_cell = function () {
                    Jupyter.notebook.
                        insert_cell_below('markdown')
                    Jupyter.notebook.select_next();
                    //Jupyter.notebook.execute_cell_and_select_below();
                };
                insert_cell();
                var inserted_cell = Jupyter.notebook.get_selected_cell();
                inserted_cell.unrender();
                inserted_cell.set_text("**Explicação do ChatGPT**: \n" + result.choices[0].text);
                inserted_cell.render();
            })

            .catch(function (error) {
                console.log("Error: " + error);
            });
    };
    var complete_code = function () {
        var selectedCell = Jupyter.notebook.get_selected_cell();
        var cellContent = selectedCell.get_text();
        console.log(cellContent);

        // make HTTP request to OpenAI
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + OPENAI_API_KEY
            },

            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: cellContent,
                temperature: 0.5,
                max_tokens: 2048,
                user: "ryoji"
            })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                // display result in the output of the selected cell
                selectedCell.output_area.append_output({
                    output_type: "display_data",
                    data: {
                        "text/plain": result.choices[0].text
                    }
                });
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
    };
    var debug_code = function () {
        var selectedCell = Jupyter.notebook.get_selected_cell();
        var cellContent = selectedCell.get_text();

        if (selectedCell.output_area.outputs[0]["output_type"] == "error") {
            tracebackContent = selectedCell.output_area.outputs[0]["traceback"]
        } else {
            tracebackContent = ""
        }



        console.log(cellContent);

        // make HTTP request to OpenAI
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + OPENAI_API_KEY
            },

            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: "Efetue o debug do código a seguir, conforme o código de input" + cellContent + " e o traceback retornado: " + tracebackContent,
                temperature: 0.5,
                max_tokens: 2048,
                user: "ryoji"
            })
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                // display result in the output of the selected cell
                selectedCell.output_area.append_output({
                    output_type: "display_data",
                    data: {
                        "text/plain": result.choices[0].text
                    }
                });
            })
            .catch(function (error) {
                console.log("Error: " + error);
            });
    };
    // // Add Toolbar button
    var explainButton = function () {
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register({
                'help': 'Explain ChatGPT',
                'icon': 'fa-file-text-o',
                'handler': explain_cell
            }, 'explain-chatgpt-cell', 'Explain cell with ChatGPT')
        ])
    }
    var completeButton = function () {
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register({
                'help': 'Complete with ChatGPT',
                'icon': 'fa-comment-o',
                'handler': complete_code
            }, 'complete-chatgpt-cell', 'Complete cell with ChatGPT')
        ])
    }
    var debugButton = function () {
        Jupyter.toolbar.add_buttons_group([
            Jupyter.keyboard_manager.actions.register({
                'help': 'Debug with ChatGPT',
                'icon': 'fa-bug',
                'handler': debug_code
            }, 'debug-chatgpt-cell', 'Debug cell with ChatGPT')
        ])
    }
    // Run on start
    function load_ipython_extension() {
        // Add a default cell if there are no cells
        // if (Jupyter.notebook.get_cells().length === 1) {
        //     insert_cell();
        // }
        explainButton();
        completeButton();
        debugButton();
    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});