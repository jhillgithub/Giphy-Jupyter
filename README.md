# Giphy Extension to Jupyter Notebooks
The purpose of this project was to test out creating a custom Extension
to Jupyter notebooks. This extension is triggered by pressing the 'g' key
on the keyboard. The dialog model has a giphy button that will fetch the
latest trending gif from giphy.com and display the image in the selected
cell in Jupyter.

```python
import notebook.nbextensions
notebook.nbextensions.install_nbextension('giphy.js', user=True)

%%javascript
Jupyter.utils.load_extensions('giphy')

```
