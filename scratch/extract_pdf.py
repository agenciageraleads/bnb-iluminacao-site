import sys

try:
    import pypdf
    reader = pypdf.PdfReader(sys.argv[1])
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n---PAGE_BREAK---\n"
    print(text)
except ImportError:
    try:
        import PyPDF2
        reader = PyPDF2.PdfReader(sys.argv[1])
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n---PAGE_BREAK---\n"
        print(text)
    except ImportError:
        try:
            import fitz
            doc = fitz.open(sys.argv[1])
            text = ""
            for page in doc:
                text += page.get_text() + "\n---PAGE_BREAK---\n"
            print(text)
        except ImportError:
            print("No suitable PDF library found (pypdf, PyPDF2, fitz).")
