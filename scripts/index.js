import { TextWrapPX as TextWrapPXWorker } from './text-wrap-px.js';


function TextWrapPX(text, options) {
    const self = this || {};
    const isInstance = self.isInstance = self.__name__ === 'TextWrapPX';

    const textWrapPX = new TextWrapPXWorker(options, text);

    if (!isInstance) {
        const result = textWrapPX.build();
        textWrapPX.destroy();

        return result;
    } else {
        return {
            build(text) {
                return textWrapPX.build(text);
            },
            destroy() {
                return textWrapPX.destroy();
            },
            setOptions(options) {
                textWrapPX.setOptions(options);
                return this;
            },
            $width(text) {
                return textWrapPX.$width(text);
            },
            $height(text) {
                return textWrapPX.$height(text);
            },
            getoptions() { return textWrapPX.getoptions(); }
        };
    }
}
TextWrapPX.prototype.__name__ = 'TextWrapPX';


global && (global.TextWrapPX = TextWrapPX);

module.exports = TextWrapPX;
