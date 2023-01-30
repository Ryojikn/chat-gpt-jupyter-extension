Chat GPT Jupyter extension
==================

A Chat GPT Jupyter extension for usage inside jupyter notebook.

## How to install

While in the upper folder, before chatgpt_jupyter_extension repo, execute the command below:
    jupyter nbextension install planet_jupyter --user

And then make it available through: 
    jupyter nbextension enable planet_jupyter/main

## To uninstall, execute the commands below:

    - jupyter nbextension disable planet_jupyter/main
    - jupyter nbextension uninstall planet_jupyter

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