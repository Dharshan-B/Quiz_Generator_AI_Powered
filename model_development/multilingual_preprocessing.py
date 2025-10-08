from langdetect import detect
from googletrans import Translator

translator = Translator()

def preprocess_text(text):
    try:
        lang = detect(text)
        if lang != "en":
            translated = translator.translate(text, src=lang, dest="en").text
            return translated
        return text
    except:
        return text
