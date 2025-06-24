# Simple Online Text Editor

A lightweight and efficient online text editor built with pure HTML, CSS, and JavaScript.

[Link to Live Demo](https://bz2.in/textdit)
[Link to YouTube Demo](https://bz2.in/t3d3mo)

## Features

* **Live Character and Word Counters:** Get instant feedback on your text composition.
* **Load Text Files:** Easily open and work with existing `.txt` files.
* **Clear Content:** Quickly reset the editor with a dedicated button.
* **Cleanup Macro:** Removes common markup from pasted text (note: currently also removes `#` from tags).
* **Templates:** Provides starter content for frequently used text structures.
* **Find and Replace:** Supports JavaScript-compatible regular expressions for powerful text manipulation.
* **Pure Client-Side:** Runs entirely in the browser, no server-side dependencies.
* **Lightweight:** Built with simplicity and efficiency in mind.

## Usage

Simply open the `index.html` file in your web browser to start using the editor.

* Type directly into the main text area.
* Use the buttons provided for specific actions:
    * **Load File:** Select a `.txt` file from your local system.
    * **Clear Content:** Empties the text editor.
    * **Cleanup Macro:** Attempts to remove common markup.
    * **Template:** Opens a dropdown or provides buttons to insert predefined templates.
    * **Find:** Opens the find functionality.
    * **Replace:** Opens the replace functionality.

## Known Issues

* The "Cleanup Macro" currently removes the `#` symbol from tags along with other markup. This is a known bug and may be addressed in a future update.

## Contributing

While this project was initially a personal tool, I'm now open to potential contributions and feedback. If you have suggestions, bug reports, or would like to contribute, please feel free to:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Submit a pull request.

## License

[*(Add your preferred license here, e.g., MIT License)*](../../LICENSE)

## Author

[*(Jiju Thomas Mathew/jthoma)*](https://github.com/jthoma)

## Acknowledgements
**FileSaver.js:** Used for client-side file saving functionality and that is from the original authors.
**Bootstrap, Font awsome and Jquery** are licenced according to their respective authors and is used from their respective public cdn. 

## Notes

This project was created as a personal tool for quick text editing tasks. The simplicity and client-side nature make it easily accessible and portable.

The templates are in a variable tplval which is base64 encoded to include the newline and markup characters without issue. 
;) jthoma stands for Jiju Thomas Mathew, which is my full name
