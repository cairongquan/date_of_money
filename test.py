import spacy
import sys
import json

parseValue:str = sys.argv[len(sys.argv)-1]

nlp = spacy.load('zh_core_web_md')

numberList = ['0','1','2','3','4','5','6','7','8','9','.']

# 获取词句中钱数
def getLoadingParams(value:str):
    tempValueString:list|str = list(value)
    rmbIndex:None|int = None
    lastIndex:None|int = None
    for i in range(len(tempValueString)):
        if tempValueString[i] == '¥':
            rmbIndex = i
        if ~(rmbIndex is None) & (tempValueString[i] in numberList):
                lastIndex = i
    del tempValueString[rmbIndex]
    tempValueString.insert(lastIndex,'元')

    result = {
        'price':'',
        'thing':''
    }
    doc = nlp(''.join(tempValueString))
    for token in doc:
        if token.pos_ == 'NOUN':
            result['thing'] = token.text
    for token in doc.ents:
        if token.label_ == 'MONEY':
            result['price'] = token.text.replace('元','')
    return result

print(json.dumps(getLoadingParams(parseValue)))
