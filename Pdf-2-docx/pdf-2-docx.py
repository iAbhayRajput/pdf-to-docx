import sys
from pdf2docx import Converter

def pdf_to_docx(pdf_path):
    try:
        docx_path = pdf_path.replace('.pdf','.docx') 
        cv= Converter(pdf_path)
        cv.convert(docx_path,start=0,end=None)
        cv.close()
        return True,docx_path

    except Exception as e :
        print(f"Error converting Pdf to docx :{e}")
        return False,None
    
#check if path is given in the form of command line arguments 
if len(sys.argv) < 2:
    print('Usage : python script.py <pdf path>')
    sys.exit(1)

pdf_path = sys.argv[1]
success, docx_path = pdf_to_docx(pdf_path)

if success:
    print(f"PDF converted to Docx successfully")
else:
    print(f"failed to convert the file")