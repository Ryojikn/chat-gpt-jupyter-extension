Chat GPT Jupyter extension
==================

A Chat GPT Jupyter extension for usage inside jupyter notebook.

One of the main reasons that I completely envision that this will be the path is due to the democratization of technology and knowledge.

Use this little piece of technology with a good heart and thinking of a humble purpose.

## Features
Explain - When selecting a jupyter notebook cell, and asking for the tool to explain, it will ask chatgpt what is the explanation behind the code provided in the cell.

Complete - When you don't know what you're trying to accomplish, such as generating some function or creating a scaffolding, describing the task for chatgpt and ask it to complete for you, will return a (not always) working code with little changes needed.

Debug - If you've got some error in your cell, after selecting the cell, and clicking in the debug button, it will send both input from the cell and the traceback provided inside jupyter notebook, and chatgpt will try to debug it for you.

## How to install

While in the upper folder, before chatgpt_jupyter_extension repo, execute the command below:

    - jupyter nbextension install chat-gpt-jupyter-extension --user

And then make it available through: 

    - jupyter nbextension enable chat-gpt-jupyter-extension/main

## To uninstall, execute the commands below:

    - jupyter nbextension disable chat-gpt-jupyter-extension/main
    - jupyter nbextension uninstall chat-gpt-jupyter-extension

## Backlog
- Make it available to be installed through pip
- Deploy inside pypi
- Use other ways to address the environment variables other than inside the code itself.
- Also accept a custom openAI endpoint, such as Azure OpenAI.
- Make it available to be installed on both jupyter lab and notebooks.
- Better UX.


## Inspired by:

I've took a while to develop this extension, inspired by [JFLAM browser extension](https://github.com/jflam/chat-gpt-jupyter-extension) and [TiesdeKok browser extension](https://github.com/TiesdeKok/chat-gpt-jupyter-extension).

Considering that something natural to jupyter would be much more useful, I took a while to address the three expected behaviors: Explain, Complete and Debug.

Probably there's so much more to add and will address in the future.