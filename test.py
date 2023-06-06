import spacy
import sys
import json

parseValue:str = sys.argv[len(sys.argv)-1]

nlp = spacy.load('zh_core_web_md')

# 获取词句中钱数
def getLoadingParams(value:str):
    numberList = ['0','1','2','3','4','5','6','7','8','9','.']
    numberIndexs = []

    tempValueString:list|str = list(value)
    rmbIndex:None|int = None
    lastIndex:None|int = None
    for i in range(len(tempValueString)):
        if tempValueString[i] == '¥':
            rmbIndex = i
        if ~(rmbIndex is None) and (tempValueString[i] in numberList):
            if len(numberIndexs) != 0 and (numberIndexs[len(numberIndexs)-1]['index']) != i-1:
                lastIndex = None
                numberIndexs = []
                print('target',i)
            else:
                lastIndex = i
                numberIndexs.append({
                    'index':i,
                    'item':tempValueString[i]
                })
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
    for i in range(len(doc.ents)):
        token = doc.ents[i]
        if token.label_ == 'MONEY':
            result['price'] = token.text.replace('元','')
            if (numberIndexs[len(numberIndexs)-1]['item'] == result['price'].split(None)[len(result['price'].split(None))-1]) and ~~(doc.ents[i-1].label_ == 'CARDINAL'):
                result['price'] = ''
                for textItem in numberIndexs:
                    result['price'] += textItem['item']
    return result

print(json.dumps(getLoadingParams(parseValue)))
